import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import UserDB from '../database/user';
import { UserType } from '../models/User';

const SALT_ROUNDS = 15;
const PASSWORD_PROJECTION_STRING : string = "CONVERT(password using utf8) as password";

export const validatePassword = async (req : Request, res : Response, next : NextFunction) => {
    if (req.body.password === undefined) {
        res.send({message: "wrong password"}).status(500);
        console.log("Password is undefined");
        return false;
    }

    let password = req.body.password;
    let hashedPassword = await UserDB.find([PASSWORD_PROJECTION_STRING], {email: req.body.email})
    
    if(await bcrypt.compare(password, hashedPassword['password'])) {
        next();
    }
    else {
        res.send({message: "wrong password"}).status(500);
        console.log("Invalid password")
        return;
    }
};

export const hashPassword = (req : Request, res : Response, next : NextFunction) => {
    if (req.body.password === undefined) {
        res.send("Password is undefined").status(500);
        return;
    }

    let password = req.body.password;

    bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
        if (err) {
            throw Error("Error generating salt");
        }
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
                throw Error("Error hashing password");
            }
            req.body.password = hash;
            next();
        });
    });
};

export const setSession = async (req : Request, res : Response, next : NextFunction) => {
    if (req.session !== undefined) {
        let data = await UserDB.find(["prefix_i", "id"], {email: req.body.email})
        let user = data['prefix_id'] + data['id'].toString().padStart(5, '0');

        

        req.session.regenerate((err) => {
            if (err) {
                res.status(500).send("Error regenerating session");
            }

            req.session.user = user;
            if (data['prefix_id'] === '100') {
                req.session.userType = UserType.ADMIN;
            }
            else {
                req.session.userType = UserType.USER;
            }
        });

        req.session.save((err) => {
            console.log("Session saved")
            if (err) {
                res.status(500).send("Error saving session");
                console.log("Error saving session")
            }
            else {
                next();
            }
        });

    }
    else {
        res.status(500).send("Session is undefined");
    }
}


export const validateSession = () => {
    return (req : Request, res : Response, next : NextFunction) => {
        console.log(`Session in Validation is: ${req.sessionID}`)
        console.log("User session is: ", req.session.user)
        console.log("User type is: ", req.session.userType)
        console.log("validating session");

        const userType = req.session.userType;
        const allowedTypes : string[] = [];
        const admin = req.body['admin']
        const user  = req.body['user']
        
        // REFACTOR LATER
        if (admin === "true") {
            allowedTypes.push(UserType.ADMIN);
        }

        if (user === "true") {
            console.log(`user is allowed when user is ${user}`)
            allowedTypes.push(UserType.USER);
        }

        if (userType === null || userType === undefined) {
            res.send({auth: false, message: "No session found"}).status(401);
            return;
        }
        if (!allowedTypes.includes(userType)) {
            res.send({auth: false, message: "Not authorized"}).status(401);
            return;
        }
        console.log(allowedTypes)
        if (allowedTypes.includes(userType)) {
            console.log("valid session");
            res.send({auth: true, message: "Valid session"}).status(200);
            return;
        }

        console.log("ERROR");
    }
}

import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import UserDB from '../database/user';
import { UserType } from '../models/User';

const SALT_ROUNDS = 15;
const PASSWORD_PROJECTION_STRING : string = "CONVERT(password using utf8) as password";

export const validatePassword = async (req : Request, res : Response, next : NextFunction) => {
    if (req.body.password === undefined) {
        res.send("Password is undefined").status(500);
        console.log("Password is undefined");
        return false;
    }

    let password = req.body.password;
    let hashedPassword = await UserDB.find(PASSWORD_PROJECTION_STRING, {email: req.body.email})
    
    if(await bcrypt.compare(password, hashedPassword['password'])) {
        next();
    }
    else {
        res.send("Invalid password").status(500);
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
        let data = await UserDB.find("prefix_id, id", {email: req.body.email})
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


export const validateSession = (requiredType : string[]) => {
    return (req : Request, res : Response, next : NextFunction) => {
        let userType = req.session.userType;
        console.log(`User type in validation is: ${userType}`)
        if (req.body.admin === true) {
            requiredType.push(UserType.ADMIN);
        }

        if (userType === null || userType === undefined) {
            res.send({auth: false, message: "No session found"}).status(401);
            return;
        }

        if (requiredType.includes(userType) === false) {
            res.send({auth: false, message: "False session"}).status(401);
            return;
        }
  
        next();
    }
}

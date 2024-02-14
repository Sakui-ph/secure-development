import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import UserDB from '../database/user';

const SALT_ROUNDS = 15;
const PASSWORD_PROJECTION_STRING : string = "CONVERT(password using utf8) as password";

export const validatePassword = async (req : Request, res : Response, next : NextFunction) => {
   
    if (req.body.password === undefined) {
        res.send("Password is undefined").status(500);
        return false;
    }

    let password = req.body.password;
    let hashedPassword = await UserDB.find(PASSWORD_PROJECTION_STRING, {email: req.body.email})
    
    if(await bcrypt.compare(password, hashedPassword['password'])) {
        res.send("Password is valid").status(200);
        next();
    }
    else
        res.send("Invalid password").status(500);
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

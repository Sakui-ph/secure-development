import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';

const SALT_ROUNDS = 15;

export const validatePassword = async (password: string, hashedPassword: string) : Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
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

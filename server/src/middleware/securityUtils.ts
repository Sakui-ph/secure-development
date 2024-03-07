import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import UserDB from '../database/user';
import { UserType } from '../models/User';
import { LogDebug, LogError, LogType } from '../utils/logger';

const SALT_ROUNDS = 15;
const PASSWORD_PROJECTION_STRING: string =
    'CONVERT(password using utf8) as password';

export const validatePassword = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    LogDebug('Validating password...');
    if (req.body.password === undefined || req.body.password === '') {
        LogError('No password', LogType.AUTH);
        res.send({ message: 'no password' }).status(500);
        return false;
    }

    const password = req.body.password;
    const hashedPassword = await UserDB.find([PASSWORD_PROJECTION_STRING], {
        email: req.body.email,
    });

    if (await bcrypt.compare(password, hashedPassword['password'])) {
        next();
    } else {
        LogError('Wrong password', 'Wrong password');
        res.send({ message: 'wrong password' }).status(500);
        return;
    }
};

export const hashPassword = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (req.body.password === undefined) {
        return;
    }

    const password = req.body.password;

    bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
        if (err) {
            LogError(
                err.stack ? err.stack : err.message,
                'Error generating salt',
            );
            throw Error('Error generating salt');
        }
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
                if (err instanceof Error) {
                    LogError(
                        err.stack ? err.stack : err.message,
                        'Error hashing password',
                    );
                }
                throw Error('Error hashing password');
            }
            req.body.password = hash;
            next();
        });
    });
};

export const setSession = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (req.session !== undefined) {
        const data = await UserDB.find(['prefix_id', 'id'], {
            email: req.body.email,
        });
        const user = data['prefix_id'] + data['id'].toString().padStart(5, '0');

        req.session.regenerate((err) => {
            if (err) {
                LogError(err, 'Error regenerating session');
                res.status(500).send('Error regenerating session');
            }

            req.session.user = user;
            if (data['prefix_id'] === '100') {
                req.session.userType = UserType.ADMIN;
            } else {
                req.session.userType = UserType.USER;
            }
        });

        req.session.save((err) => {
            if (err) {
                LogError(err, 'Error saving session');
                res.status(500).send('Error saving session');
            } else {
                next();
            }
        });
    } else {
        res.status(500).send('Session is undefined');
    }
};

export const validateSession = () => {
    return (req: Request, res: Response) => {
        const userType = req.session.userType;
        const data = req.body['data[]'].toString();
        const allowedTypes: string[] = data.split(',');

        LogDebug(`Allowed types: ${allowedTypes}`);
        LogDebug(`User type: ${userType}`);

        if (allowedTypes.includes(userType) || allowedTypes.includes('none')) {
            res.send({ auth: true, message: 'Valid session' }).status(200);
            return;
        }
        res.send({ auth: false, message: 'Not authorized' }).status(401);

        return;
    };
};

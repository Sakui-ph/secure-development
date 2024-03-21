import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import UserDB from '../database/user';
import { UserType } from '../models/User';
import { LogDebug, LogError, LogInfo, LogType } from '../utils/logger';

const SALT_ROUNDS = 15;
const PASSWORD_PROJECTION_STRING: string =
    'CONVERT(password using utf8) as password';

export const validatePassword = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    LogDebug(`Validating password...`);
    if (req.body.password === undefined || req.body.password === '') {
        LogError(
            `No password provided for email ${req.body.email}`,
            null,
            LogType.AUTH,
        );
        res.send({ success: false, message: 'no password provided' }).status(
            500,
        );
        res.end();
        return;
    }

    const password = req.body.password;
    const hashedPassword = await UserDB.find([PASSWORD_PROJECTION_STRING], {
        email: req.body.email,
    });

    if (hashedPassword === undefined) {
        LogError(
            `Wrong account attempt for ${req.body.email}`,
            null,
            LogType.AUTH,
        );
        res.send({ success: false, message: 'Wrong account' }).status(500);
        res.end();
        return;
    }

    if (await bcrypt.compare(password, hashedPassword['password'])) {
        LogInfo(`Login for ${req.body.email} successful`, LogType.AUTH);

        next();
    } else {
        LogError(
            `Wrong password attempt for ${req.body.email}`,
            null,
            LogType.AUTH,
        );
        res.send({ success: false, message: 'wrong password' }).status(500);
        res.end();
        return;
    }
};

export const hashPassword = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (req.body.password === undefined) {
        LogError('No password', null, LogType.AUTH);
        return;
    }

    const password = req.body.password;

    bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
        if (err) {
            LogError('Error generating salt', err, LogType.AUTH);
            throw Error('Error generating salt');
        }
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
                if (err instanceof Error) {
                    LogError('Error hashing password', err, LogType.AUTH);
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
        const email = req.body.email;
        const data = await UserDB.find(['prefix_id', 'id', 'first_name'], {
            email: email,
        });
        const firstName = data['first_name'];
        const user = data['prefix_id'] + data['id'].toString().padStart(5, '0');

        req.session.regenerate((err) => {
            if (err) {
                LogError('Error regenerating session', null, LogType.AUTH);
                res.status(500).send('Error regenerating session');
            }
            req.session.firstName = firstName;
            req.session.email = email;
            req.session.user = user;
            if (data['prefix_id'] === '100') {
                req.session.userType = UserType.ADMIN;
            } else {
                req.session.userType = UserType.USER;
            }
        });

        req.session.save((err) => {
            if (err) {
                LogError('Error saving session', err, LogType.AUTH);
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

export const validateAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (req.session.userType === UserType.ADMIN) {
        next();
        return;
    } else {
        LogError(
            `User ${req.session.user} is not authorized to access this route`,
            null,
            LogType.AUTH,
        );
        res.send({ auth: false, message: 'Not authorized' }).status(401);
        return;
    }
};

export const validateLoggedIn = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (req.session.email === undefined) {
        LogError('User is not logged in', null, LogType.AUTH);
        res.send({ auth: false, message: 'Not authorized' }).status(401);
        return;
    }

    const data = await UserDB.find(['prefix_id', 'id', 'first_name'], {
        email: req.session.email,
    });
    const userID = data['prefix_id'] + data['id'].toString().padStart(5, '0');

    if (
        req.session.user === userID &&
        req.session.firstName === data['first_name']
    ) {
        next();
        return;
    }

    LogError('User is not logged in', null, LogType.AUTH);
    res.send({ auth: false, message: 'Not authorized' }).status(401);
    return;
};

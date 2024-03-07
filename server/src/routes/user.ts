import express, { Request, Response } from 'express';
import controller from '../controller/user';
import {
    hashPassword,
    validatePassword,
    setSession,
    validateSession,
} from '../middleware/securityUtils';
import { UserParams } from '../models/User';
import inputValidtion from '../middleware/inputValidation';
import { LogError, LogInfo, LogType } from '../utils/logger';
import asyncify from 'express-asyncify';

const router = asyncify(express.Router());

router.post(
    '/login',
    validatePassword,
    setSession,
    (req: Request, res: Response) => {
        res.send({ success: true }).status(200);
    },
);

router.post('/logout', (req: Request, res: Response) => {
    req.session.user = null;
    req.session.save(function (err) {
        if (err) LogError(err, 'Error saving session on logout');
    });

    req.session.regenerate(function (err) {
        if (err) LogError(err, 'Error regenerating session on logout');
        res.send('Logout successful').status(200);
    });
});

router.post('/validateSession', validateSession());

router.get(
    '/read',
    inputValidtion.checkEmail,
    async function (req: Request, res: Response) {
        try {
            const result = await controller.getUser(
                [UserParams.FIRST_NAME, UserParams.LAST_NAME],
                [UserParams.EMAIL],
            );
            console.log(result);
            res.send();
        } catch (e) {
            if (e instanceof Error) LogError(e.toString(), LogType.TRANSACTION);
            if (typeof e === 'string') LogError(e, LogType.TRANSACTION);
        }
    },
);

router.post(
    '/create',
    inputValidtion.checkUser,
    hashPassword,
    async (req: Request, res: Response) => {
        const result = await controller.createUser(req, res);
        LogInfo(result, LogType.TRANSACTION);
        res.send('User created').status(200);
    },
);

router.patch(
    '/update',
    inputValidtion.checkUser,
    controller.updateUser(
        [UserParams.FIRST_NAME, UserParams.LAST_NAME, UserParams.PHONE_NUMBER],
        [UserParams.EMAIL],
    ),
    (req: Request, res: Response) => {
        res.send('User updated').status(200);
    },
);

export { router as UserRoutes };

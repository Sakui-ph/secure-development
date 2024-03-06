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

const router = express.Router();

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
    controller.getUser(
        [UserParams.FIRST_NAME, UserParams.LAST_NAME],
        [UserParams.EMAIL],
    ),
    (req: Request, res: Response) => {
        res.send();
    },
);

router.post(
    '/create',
    inputValidtion.checkUser,
    hashPassword,
    (req: Request, res: Response) => {
        const result = controller.createUser(req, res);
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

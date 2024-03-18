import express, { Request, Response } from 'express';
import userController from '../controller/user';
import {
    hashPassword,
    validatePassword,
    setSession,
    validateSession,
} from '../middleware/securityUtils';
import { UserParams } from '../models/User';
import inputValidation from '../middleware/inputValidation';
import { LogError, LogInfo, LogType } from '../utils/logger';
import asyncify from 'express-asyncify';
import bodyParser from 'body-parser';
import { uploadProfilePicture } from '../utils/multerHandler';

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const extendedParser = bodyParser.urlencoded({ extended: true });

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
    inputValidation.checkEmail,
    async function (req: Request, res: Response) {
        try {
            const getUser = userController.getUser(
                [UserParams.FIRST_NAME, UserParams.LAST_NAME],
                [UserParams.EMAIL],
            );
            const result = await getUser(req, res);
            LogInfo(result, LogType.TRANSACTION);
            res.send();
        } catch (e) {
            if (e instanceof Error) LogError(e.toString(), LogType.TRANSACTION);
            if (typeof e === 'string') LogError(e, LogType.TRANSACTION);
        }
    },
);

router.post(
    '/create',
    express.json(),
    extendedParser,
    uploadProfilePicture,
    inputValidation.checkProfilePicture,
    inputValidation.checkUser,
    hashPassword,
    async (req: Request, res: Response) => {
        try {
            const result = await userController.createUser(req, res);
            if (!result) {
                LogInfo(`User ${req.body.email} created`, LogType.TRANSACTION);
                res.send('User created').status(200);
            } else {
                LogError(result, 'Error creating user', LogType.TRANSACTION);
                res.send('Error creating user').status(500);
            }
        } catch (e) {
            LogError(
                'Error creating user',
                'Error creating user',
                LogType.TRANSACTION,
            );
            res.send(e).status(500);
        }
    },
);

router.post('/changeProfilePicture', (req: Request, res: Response) => {
    res.send('Profile picture changed').status(200);
});

router.patch(
    '/update',
    urlencodedParser,
    inputValidation.checkUser,
    userController.updateUser(
        [UserParams.FIRST_NAME, UserParams.LAST_NAME, UserParams.PHONE_NUMBER],
        [UserParams.EMAIL],
    ),
    (req: Request, res: Response) => {
        res.send('User updated').status(200);
    },
);

export { router as UserRoutes };

import express, { Request, Response } from 'express';
import userController from '../controller/user';
import {
    hashPassword,
    validateAdmin,
    validateLoggedIn,
} from '../middleware/securityUtils';
import inputValidation from '../middleware/inputValidation';
import { LogError, LogInfo, LogType } from '../utils/logger';
import asyncify from 'express-asyncify';
import bodyParser from 'body-parser';
import { uploadProfilePicture } from '../utils/multerHandler';
import { UserParams } from '../models/User';

const extendedParser = bodyParser.urlencoded({ extended: true });

const router = asyncify(express.Router());

router.post(
    '/create',
    validateLoggedIn,
    validateAdmin,
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
                LogInfo(
                    `Admin ${req.body.email} created by admin ${req.session.user}`,
                    LogType.TRANSACTION,
                );
                res.send('User created').status(200);
            } else {
                LogError('Error creating user', result, LogType.TRANSACTION);
                res.send('Error creating user').status(500);
            }
        } catch (e) {
            LogError('Error creating user', e as Error, LogType.TRANSACTION);
            res.send(e).status(500);
        }
    },
);

router.post(
    '/readUsers',
    validateLoggedIn,
    validateAdmin,
    async (req: Request, res: Response) => {
        try {
            const getAllUsers = await userController.getAllUsers([
                UserParams.FIRST_NAME,
                UserParams.LAST_NAME,
                UserParams.PHONE_NUMBER,
                UserParams.EMAIL,
            ]);

            const result = await getAllUsers(req, res);
            LogInfo(
                `Admin ${req.session.user} read all users`,
                LogType.TRANSACTION,
            );
            res.send(result);
        } catch (e) {
            if (e instanceof Error)
                LogError('Error reading users', e, LogType.TRANSACTION);
        }
    },
);

router.post('/test', async (req: Request, res: Response) => {
    res.send('Test').status(200);
});

export { router as AdminRoutes };

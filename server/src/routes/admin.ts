import express, { Request, Response } from 'express';
import userController from '../controller/user';
import { hashPassword, validateSession } from '../middleware/securityUtils';
import inputValidation from '../middleware/inputValidation';
import { LogError, LogInfo, LogType } from '../utils/logger';
import asyncify from 'express-asyncify';
import bodyParser from 'body-parser';
import { uploadProfilePicture } from '../utils/multerHandler';

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const extendedParser = bodyParser.urlencoded({ extended: true });

const router = asyncify(express.Router());

router.post('/validateSession', urlencodedParser, validateSession());

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
                LogError('Error creating user', result, LogType.TRANSACTION);
                res.send('Error creating user').status(500);
            }
        } catch (e) {
            LogError('Error creating user', e as Error, LogType.TRANSACTION);
            res.send(e).status(500);
        }
    },
);

export { router as AdminRoutes };

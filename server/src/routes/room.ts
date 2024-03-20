import express, { Request, Response } from 'express';
import reservationContoller from '../controller/reservation';
import { LogError, LogInfo, LogType } from '../utils/logger';
import asyncify from 'express-asyncify';
import bodyParser from 'body-parser';
import { uploadPDF } from '../utils/multerHandler';
import { validateLoggedIn } from '../middleware/securityUtils';
import inputValidation from '../middleware/inputValidation';

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const extendedParser = bodyParser.urlencoded({ extended: true });

const router = asyncify(express.Router());

router.post(
    '/create',
    validateLoggedIn,
    express.json(),
    extendedParser,
    uploadPDF.single('clientIdFile'),
    inputValidation.checkClientIDPDF,
    async (req: Request, res: Response) => {
        try {
            const result = await reservationContoller.createReservation(
                req,
                res,
            );
            if (!result) {
                LogInfo(`Room reserved!`, LogType.TRANSACTION);
                res.send('Room reserved!').status(200);
            } else {
                LogError('Error reserving room', result, LogType.TRANSACTION);
                res.send('Error reserving room').status(500);
            }
        } catch (e) {
            LogError('Error reserving room', e as Error, LogType.TRANSACTION);
            res.send('Error reserving room').status(500);
        }
    },
);

router.get('/read', urlencodedParser, async (req: Request, res: Response) => {
    try {
        LogInfo('Router', LogType.TRANSACTION);
        const result = await reservationContoller.getReservation(
            ['reservation_date', 'email', 'room', 'adminApproved'],
            ['email'],
        )(req, res);
        LogInfo(result, LogType.TRANSACTION);
        res.send(result); // Send response after handling the result
    } catch (e) {
        LogError('Error getting reservation', e as Error, LogType.TRANSACTION);
        res.send('Error getting reservation').status(500); // Send error response with status
    }
});

export { router as RoomRoutes };

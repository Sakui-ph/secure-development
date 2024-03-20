import express, { Request, Response } from 'express';
import reservationContoller from '../controller/reservation';
import { LogError, LogInfo, LogType } from '../utils/logger';
import asyncify from 'express-asyncify';
import bodyParser from 'body-parser';
import { uploadFormdata } from '../utils/multerHandler';

const extendedParser = bodyParser.urlencoded({ extended: true });

const router = asyncify(express.Router());

router.post(
    '/create',
    express.json(),
    extendedParser,
    uploadFormdata,
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

export { router as RoomRoutes };

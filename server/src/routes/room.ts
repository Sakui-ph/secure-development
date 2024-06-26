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
    inputValidation.sanitizeRoom,
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
        const result = await reservationContoller.getReservation(
            [
                'id',
                'reservation_date',
                'email',
                'room',
                'adminApproved',
                'reservationStatus',
            ],
            ['email'],
        )(req, res);
        LogInfo(result, LogType.TRANSACTION);
        res.send(result); // Send response after handling the result
    } catch (e) {
        LogError('Error getting reservation', e as Error, LogType.TRANSACTION);
        res.send('Error getting reservation').status(500); // Send error response with status
    }
});

router.get(
    '/readAll',
    urlencodedParser,
    async (req: Request, res: Response) => {
        try {
            const result = await reservationContoller.getAllReservations([
                'id',
                'reservation_date',
                'email',
                'room',
                'adminApproved',
                'clientIdFile',
                'reservationStatus',
            ])(req, res);
            res.send(result);
        } catch (e) {
            LogError(
                'Error getting all reservations',
                e as Error,
                LogType.TRANSACTION,
            );
            res.send('Error getting all reservations').status(500);
        }
    },
);

router.patch(
    '/update',
    express.json(),
    extendedParser,
    validateLoggedIn,
    async (req: Request, res: Response) => {
        try {
            const result = await reservationContoller.updateReservationStatus(
                req,
                res,
            );
            if (result) {
                LogInfo('Admin approved status updated', LogType.TRANSACTION);
                res.send('Admin approved status updated').status(200);
            } else {
                LogError(
                    'Error updating Admin approved status',
                    result,
                    LogType.TRANSACTION,
                );
                res.send('Error updating Admin approved status').status(500);
            }
        } catch (e) {
            LogError(
                'Error updating Admin approved status',
                e as Error,
                LogType.TRANSACTION,
            );
            res.send('Error updating Admin approved status').status(500);
        }
    },
);

router.patch(
    '/updateReservationStatus',
    express.json(),
    extendedParser,
    validateLoggedIn,
    async (req: Request, res: Response) => {
        try {
            const result = await reservationContoller.updateReservationStatus2(
                req,
                res,
            );
            if (result) {
                LogInfo('Reservation status updated', LogType.TRANSACTION);
                res.send('Reservation status updated').status(200);
            } else {
                LogError(
                    'Error updating reservation status',
                    result,
                    LogType.TRANSACTION,
                );
                res.send('Error updating reservation status').status(500);
            }
        } catch (e) {
            LogError(
                'Error updating reservation status',
                e as Error,
                LogType.TRANSACTION,
            );
            res.send('Error updating reservation status').status(500);
        }
    },
);

router.patch(
    '/cancel',
    express.json(),
    extendedParser,
    validateLoggedIn,
    async (req: Request, res: Response) => {
        try {
            const result = await reservationContoller.cancelReservation(
                req,
                res,
            );
            if (result) {
                LogInfo('Reservation cancelled', LogType.TRANSACTION);
                res.send('Reservation cancelled').status(200);
            } else {
                LogError(
                    'Error cancelling reservation',
                    result,
                    LogType.TRANSACTION,
                );
                res.send('Error cancelling reservation').status(500);
            }
        } catch (e) {
            LogError(
                'Error cancelling reservation',
                e as Error,
                LogType.TRANSACTION,
            );
            res.send('Error cancelling reservation').status(500);
        }
    },
);

export { router as RoomRoutes };

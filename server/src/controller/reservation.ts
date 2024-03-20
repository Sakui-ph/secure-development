import { Request, Response } from 'express';
import { Reservation, ReservationStatus } from '../models/Reservation';
import ReservationDB from '../database/reservation';
import { LogError, LogType, LogWarning } from '../utils/logger';
import { Console } from 'console';

module.exports = {
    createReservation: async (req: Request, res: Response): Promise<any> => {
        const newReservation: Reservation = {
            reservation_date: req.body.date,
            email: req.session.email ?? '',
            room: req.body.room,
            adminApproved: ReservationStatus.pending,
        };
        try {
            const result = await ReservationDB.create(newReservation);
            return result;
        } catch (e) {
            if (e instanceof Error) {
                LogError(
                    'Error creating room reservation',
                    e,
                    LogType.TRANSACTION,
                );
            }
            res.end('Error creating reservation').status(500);
        }
    },

    getReservation: (projection: string[], searchBy: string[]) => {
        return async (req: Request, res: Response): Promise<any> => {
            const searchObject: Record<string, any> = {};

            searchBy.forEach((key) => {
                if (req.body[key] !== undefined) {
                    searchObject[key] = req.body[key];
                }
            });

            try {
                const result = await ReservationDB.find(projection, searchObject);
                return result;
            } catch (e) {
                if (e instanceof Error) {
                    LogError(
                        'Error getting reservation',
                        e,
                        LogType.TRANSACTION,
                    );
                }
                res.end('Error getting reservation').status(500);
            }
        };
    },

    deleteReservation: (searchBy: string[]) => {
        return async (req: Request, res: Response): Promise<any> => {
            const searchObject: Record<string, any> = {};

            searchBy.forEach((key) => {
                if (req.body[key] !== undefined) {
                    searchObject[key] = req.body[key];
                }
            });

            try {
                const result = await ReservationDB.delete(searchObject);
                res.send(result).status(200);
            } catch (e) {
                if (e instanceof Error && e.stack !== undefined) {
                    //LogError(e.stack, LogType.TRANSACTION);
                }
                res.status(500).send('Error deleting reservation');
            }
        };
    },
};

export default module.exports;

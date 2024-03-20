import { Request, Response } from 'express';
import { Reservation, ReservationStatus } from '../models/Reservation';
import ReservationDB from '../database/reservation';
import { LogError, LogType } from '../utils/logger';

module.exports = {
    createReservation: async (req: Request, res: Response): Promise<any> => {
        const newReservation: Reservation = {
            reservation_date: req.body.date,
            email: req.body.email,
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
    /*

    getReservation: (projection: string[], searchBy: string[]) => {
        return async (req: Request, res: Response) => {
            if (req.query.email === undefined && req.body.email === undefined) {
                res.status(500).send('Email is undefined');
                return;
            }
            if (projection === undefined) {
                LogWarning(
                    'Projection is undefined for getReservation',
                    'Projection is undefined',
                    LogType.TRANSACTION,
                );
                res.status(500).send('Projection is undefined');
                return;
            }

            const searchObject: Record<string, any> = {};

            searchBy.forEach((key) => {
                if (req.query[key] !== undefined) {
                    searchObject[key] = req.query[key];
                }
            });

            try {
                const result = await ReservationDB.find(
                    projection,
                    searchObject,
                );
                res.send(result).status(200);
                return result;
            } catch (e) {
                if (e instanceof Error && e.stack !== undefined) {
                    //LogError(e.stack, LogType.TRANSACTION);
                }
                res.status(500).send('Error finding reservation');
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
    */
};

export default module.exports;

import { Request, Response } from 'express';
import { Reservation } from '../models/Reservation';
import AmenityReservationDB from '../database/amenities';
import { LogError, LogType, LogWarning } from '../utils/logger';

module.exports = {
    createAmenityReservation: async (
        req: Request,
        res: Response,
    ): Promise<any> => {
        const newAmenityReservation: Reservation = {
            date: req.body.date,
            time: req.body.time,
            email: req.body.email,
            room: req.body.room,
        };
        try {
            const result = await AmenityReservationDB.create(
                newAmenityReservation,
            );
            res.send(result).status(200);
        } catch (e) {
            LogError(
                'Error creating amenity reservation',
                e as Error,
                LogType.TRANSACTION,
            );
            res.status(500).send('Error creating amenity reservation');
        }
    },

    getAmenityReservation: (projection: string[], searchBy: string[]) => {
        return async (req: Request, res: Response) => {
            if (req.query.email === undefined && req.body.email === undefined) {
                res.status(500).send('Email is undefined');
                return;
            }
            if (projection === undefined) {
                LogWarning(
                    'Projection is undefined for getAmenityReservation',
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
                const result = await AmenityReservationDB.find(
                    projection,
                    searchObject,
                );
                res.send(result).status(200);
                return result;
            } catch (e) {
                if (e instanceof Error && e.stack !== undefined) {
                    LogError('Could not get amenity', e, LogType.TRANSACTION);
                }
                res.status(500).send('Error finding amenity reservation');
            }
        };
    },

    deleteAmenityReservation: (searchBy: string[]) => {
        return async (req: Request, res: Response): Promise<any> => {
            const searchObject: Record<string, any> = {};

            searchBy.forEach((key) => {
                if (req.body[key] !== undefined) {
                    searchObject[key] = req.body[key];
                }
            });

            try {
                const result = await AmenityReservationDB.delete(searchObject);
                res.send(result).status(200);
            } catch (e) {
                if (e instanceof Error) {
                    LogError(
                        'Could not delete amenity',
                        e,
                        LogType.TRANSACTION,
                    );
                }
                res.status(500).send('Error deleting amenity reservation');
            }
        };
    },
};

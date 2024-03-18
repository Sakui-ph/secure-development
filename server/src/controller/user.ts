import { Request, Response } from 'express';
import { User } from '../models/User';
import UserDB from '../database/user';
import { LogError, LogType, LogWarning } from '../utils/logger';
import fs from 'fs';

module.exports = {
    createUser: async (req: Request, res: Response): Promise<any> => {
        // TODO separate the admin creation
        const prefix_id: number = req.body.prefix_id ? req.body.prefix_id : 101;
        let profile_picture: Buffer | undefined = req.file?.buffer;
        if (profile_picture === undefined) {
            profile_picture = fs.readFileSync(
                '../../resources/default-profile-picture.jpg',
            );
        }

        const newUser: User = {
            prefix_id: prefix_id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            phone_number: req.body.phone_number,
            profile_picture: profile_picture,
        };
        try {
            const result = await UserDB.create(newUser);
            return result;
        } catch (e) {
            if (e instanceof Error) {
                LogError('Error creating user', e, LogType.TRANSACTION);
            }
            res.end('Error creating user').status(500);
        }
    },
    getUser: (projection: string[], searchBy: string[]) => {
        return async (req: Request, res: Response) => {
            if (req.query.email === undefined && req.body.email === undefined) {
                res.status(500).send('Email is undefined');
                return;
            }
            if (projection === undefined) {
                LogWarning(
                    'Projection is undefined for getUser',
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
                const result = await UserDB.find(projection, searchObject);
                res.send(result).status(200);
                return result;
            } catch (e) {
                if (e instanceof Error) {
                    if (e !== undefined)
                        LogError('Could not find user', e, LogType.TRANSACTION);
                }
            }
        };
    },
    updateUser: (projection: string[], searchBy: string[]) => {
        return async (req: Request, res: Response): Promise<any> => {
            // TODO: Add check for if email they want to change to exists
            projection.forEach((key) => {
                if (
                    req.body[key] === undefined ||
                    req.body[key] === null ||
                    req.body[key] === ''
                ) {
                    projection.splice(projection.indexOf(key), 1);
                }
            });

            const searchObject: Record<string, any> = {};

            searchBy.forEach((key) => {
                if (req.body[key] !== undefined) {
                    searchObject[key] = req.body[key];
                }
            });

            const updateUser: User = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: req.body.password,
                phone_number: req.body.phone_number,
                profile_picture: req.body.profile_picture,
            };

            const result = await UserDB.update(
                updateUser,
                projection,
                searchObject,
            );
            res.send(result).status(200);
        };
    },
};

export default module.exports;

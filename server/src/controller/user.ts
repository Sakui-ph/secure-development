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
                return result;
            } catch (e) {
                if (e instanceof Error) {
                    if (e !== undefined)
                        LogError('Could not find user', e, LogType.TRANSACTION);
                }
            }
        };
    },
    getAllUsers: (projection: string[]) => {
        return async (req: Request, res: Response) => {
            try {
                const result = await UserDB.findAll(
                    projection,
                    req.session.email,
                );
                return result;
            } catch (e) {
                if (e instanceof Error) {
                    LogError('Could not find users', e, LogType.TRANSACTION);
                }
                res.send('Error finding users').status(500);
                return e;
            }
        };
    },
    updatePrefixId: async (req: Request, res: Response): Promise<any> => {
        const { email, newPrefixId } = req.body;

        if (!email || !newPrefixId) {
            res.status(400).send('Email and new prefix ID are required');
            return;
        }

        try {
            const result = await UserDB.updatePrefixId(email, newPrefixId);
            res.send(result).status(200);
        } catch (e) {
            if (e instanceof Error) {
                LogError('Error updating prefix_id', e, LogType.TRANSACTION);
            }
            res.send('Error updating prefix_id').status(500);
        }
    },
    getProfilePicture: async (req: Request, res: Response): Promise<any> => {
        if (req.session.email === undefined) {
            res.status(500).send('Email is undefined');
            return;
        }

        try {
            let result = await UserDB.find(['profile_picture'], {
                email: req.session.email,
            });
            result = result.profile_picture.toString('hex');
            return result;
        } catch (e) {
            if (e instanceof Error) {
                LogError(
                    'Error getting profile picture',
                    e,
                    LogType.TRANSACTION,
                );
            }
            res.send('Error getting profile picture').status(500);
        }
    },
    updateProfilePicture: async (req: Request, res: Response): Promise<any> => {
        const profile_picture: Buffer | undefined = req.file?.buffer;
        const email: string | undefined = req.session.email;

        if (email === undefined) {
            LogError(
                'User not signed in for profile picture change',
                new Error(),
                LogType.TRANSACTION,
            );
            res.send('User not signed in').status(400);
            return;
        }

        if (profile_picture === undefined) {
            LogError(
                'A new profile picture is required',
                new Error(),
                LogType.TRANSACTION,
            );
            res.send('A new profile picture is required').status(400);
            return;
        }

        try {
            await UserDB.updateProfilePicture(profile_picture, email);
            return;
        } catch (e) {
            if (e instanceof Error) {
                LogError('Error updating profile', e, LogType.TRANSACTION);
            }
        }
    },
};

export default module.exports;

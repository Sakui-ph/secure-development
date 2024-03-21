import db from './db';
import { buildUpdateQuery, convertSearchByToString } from '../utils/dbHelpers';
import { User } from '../models/User';
import { LogError, LogType } from '../utils/logger';

class UserDB {
    find = async (projection: string[], searchBy: Record<string, any>) => {
        const searchParams = convertSearchByToString(searchBy);
        const result = await db.readFromDatabase(
            `SELECT ${projection.join(', ')} FROM users WHERE ${searchParams}`,
            [],
        );
        return result[0];
    };

    findAll = async (projection: string[], exception?: string) => {
        let query = `SELECT ${projection.join(', ')} FROM users WHERE email != ?`;
        if (exception === undefined || exception === null || exception === '') {
            query = `SELECT ${projection.join(', ')} FROM users`;
        }

        const result = await db.readFromDatabase(query, [exception]);
        return result;
    };

    create = async (user: User) => {
        const query: string = 'INSERT INTO `users` SET ?';
        const values = {
            prefix_id: 101,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone_number: user.phone_number,
            profile_picture: user.profile_picture,
            password: user.password,
        };

        try {
            const result = await db.queryDatabase(query, values);
            return result;
        } catch (e) {
            LogError(
                'Error querying database',
                e as Error,
                LogType.TRANSACTION,
            );
            return (e as Error).message;
        }
    };

    update = async (
        user: User,
        projection: string[],
        searchBy: Record<string, any>,
    ) => {
        const searchParams = convertSearchByToString(searchBy);
        const query: string = buildUpdateQuery(user, projection, searchParams);

        const result = await db.executeDatabase(query, []);
        return result[0][0];
    };

    updatePrefixId = async (
        email: string,
        newPrefixId: string, // 100 for admin, 101 for user
    ) => {
        const query = `
            UPDATE users 
            SET prefix_id = ?
            WHERE email = ?
        `;
        const values = [newPrefixId, email];

        try {
            const result = await db.queryDatabase(query, values);
            return result;
        } catch (e) {
            LogError(
                'Error updating prefix_id',
                e as Error,
                LogType.TRANSACTION,
            );
            return (e as Error).message;
        }
    };

    updateProfilePicture = async (
        email: string,
        profile_picture: Blob,
    ) => {

        const query = `
            UPDATE users 
            SET profile_picture = ?
            WHERE email = ?
        `;
        const values = [profile_picture, email];
    
        try {
            const result = await db.queryDatabase(query, values);
            return result;
        } catch (e) {
            LogError(
                'Error updating profile picture',
                e as Error,
                LogType.TRANSACTION,
            );
            return (e as Error).message;
        }
    };
}

export default new UserDB();

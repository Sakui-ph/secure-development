import db from './db';
import { buildUpdateQuery, convertSearchByToString } from '../utils/dbHelpers';
import { User } from '../models/User';
import { LogError, LogType } from '../utils/logger';

class UserDB {
    find = async (projection: string[], searchBy: Record<string, any>) => {
        const searchParams = convertSearchByToString(searchBy);
        const result = await db.executeDatabase(
            `SELECT ${projection.join(', ')} FROM users WHERE ${searchParams}`,
            [],
        );

        return result[0][0];
    };

    create = async (user: User) => {
        const query: string = 'INSERT INTO `users` SET ?';
        const values = {
            prefix_id: user.prefix_id,
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
}

export default new UserDB();

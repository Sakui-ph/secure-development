import db from './db';
import { User } from '../models/User';
import { LogError, LogType } from '../utils/logger';

class AdminDB {
    create = async (user: User) => {
        const query: string = 'INSERT INTO `users` SET ?';
        const values = {
            prefix_id: user.prefix_id ? user.prefix_id : 101,
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
}

export default new AdminDB();

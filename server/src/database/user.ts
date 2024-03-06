import db from './db';
import { buildUpdateQuery, convertSearchByToString } from '../utils/dbHelpers';
import { User } from '../models/User';

class UserDB {
    find = async (projection: string[], searchBy: Record<string, any>) => {
        let searchParams = convertSearchByToString(searchBy);
        let result = await db.queryDatabase(
            `SELECT ${projection.join(', ')} FROM users WHERE ${searchParams}`,
            [],
        );
        return result[0][0];
    };

    create = async (user: User) => {
        const query: string =
            'INSERT INTO users (prefix_id, first_name, last_name, email, phone_number, profile_picture, password) ';
        const values: string = `VALUES 
        ('${user.prefix_id}', 
        '${user.first_name}', 
        '${user.last_name}', 
        '${user.email}', 
        '${user.phone_number}', 
        '${user.profile_picture}', 
        '${user.password}')`;

        var result = await db.queryDatabase(query + values, []);
        return result[0][0];
    };

    update = async (
        user: User,
        projection: string[],
        searchBy: Record<string, any>,
    ) => {
        let searchParams = convertSearchByToString(searchBy);
        const query: string = buildUpdateQuery(user, projection, searchParams);

        var result = await db.queryDatabase(query, []);
        return result[0][0];
    };
}

export default new UserDB();

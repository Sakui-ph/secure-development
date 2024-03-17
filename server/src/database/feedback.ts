import db from './db';
import { buildUpdateQuery, convertSearchByToString } from '../utils/dbHelpers';
import { Feedback } from '../models/Feedback';

class FeedbackDB {
    find = async (projection: string[], searchBy: Record<string, any>) => {
        const searchParams = convertSearchByToString(searchBy);
        const result = await db.queryDatabase(
            `SELECT ${projection.join(', ')} FROM feedbacks WHERE ${searchParams}`,
            [],
        );

        return result[0][0];
    };

    create = async (feedback: Feedback) => {
        const query: string =
            'INSERT INTO feedbacks (author, comment, photo) ';
        const values: string = `VALUES 
        ('${feedback.author}', 
        '${feedback.comment}', 
        '${feedback.photo}')`;

        const result = await db.queryDatabase(query + values, []);
        return result[0][0];
    };
}

export default new FeedbackDB();

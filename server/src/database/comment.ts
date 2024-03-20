import db from './db';
import { convertSearchByToString } from '../utils/dbHelpers';
import { Comment } from '../models/Comment';
import { LogError, LogType } from '../utils/logger';

class CommentDB {    
    find = async () => {
        const result = await db.executeDatabase(
            `SELECT * FROM comments`,
            [],
        );

        return result[0];
    };

    create = async (comment: Comment) => {
        const query: string = 'INSERT INTO comments SET ?';
        const values = {
            id: comment.id,
            text: comment.text,
            author: comment.author,
            date: comment.date,
        };

        try{
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

    delete = async (searchBy: Record<string, any>) => {
        const searchParams = convertSearchByToString(searchBy);
        const query = `DELETE FROM comments WHERE ${searchParams}`;

        const result = await db.executeDatabase(query, []);
        return result[0][0];
    };
}

export default new CommentDB();


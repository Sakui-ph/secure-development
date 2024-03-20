import db from './db';
import { convertSearchByToString } from '../utils/dbHelpers';
import { Comment } from '../models/Comment';
import { LogError, LogType } from '../utils/logger';

class CommentDB {
    findAll = async () => {
        const result = await db.readFromDatabase(`SELECT * FROM comment`, []);
        return result;
    };

    create = async (comment: Comment) => {
        const query: string = 'INSERT INTO comment SET ?';
        const values = {
            content: comment.content,
            author: comment.author,
            createdAt: comment.createdAt,
            announcementId: comment.announcementId,
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

    delete = async (searchBy: Record<string, any>) => {
        const searchParams = convertSearchByToString(searchBy);
        const query = `DELETE FROM comment WHERE ${searchParams}`;

        const result = await db.executeDatabase(query, []);
        return result[0][0];
    };
}

export default new CommentDB();

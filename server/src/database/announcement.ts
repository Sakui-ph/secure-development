import db from './db';
import { convertSearchByToString } from '../utils/dbHelpers';
import { Announcement } from '../models/Announcement';
import { LogError, LogType } from '../utils/logger';

class AnnouncementDB {
    /*find = async (projection: string[], searchBy: Record<string, any>) => {
        const searchParams = convertSearchByToString(searchBy);
        const result = await db.executeDatabase(
            `SELECT ${projection.join(', ')} FROM announcement WHERE ${searchParams}`,
            [],
        );

        return result[0][0];
    };*/

    find = async () => {
        const result = await db.executeDatabase(
            `SELECT * FROM announcement`,
            [],
        );

        return result[0];
    };

    create = async (announcement: Announcement) => {
        const query: string = 'INSERT INTO `announcement` SET ?';
        const values = {
            text: announcement.text,
        }

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
        const query = `DELETE FROM announcement WHERE ${searchParams}`;

        const result = await db.executeDatabase(query, []);
        return result[0][0];
    };
}

export default new AnnouncementDB();

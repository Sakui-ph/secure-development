import db from './db';
import { convertSearchByToString } from '../utils/dbHelpers';
import { Reservation } from '../models/Reservation';
import { LogError, LogType } from '../utils/logger';

class ReservationDB {
    find = async (projection: string[], searchBy: Record<string, any>) => {
        const searchParams = convertSearchByToString(searchBy);
        const query = `SELECT ${projection.join(',')} FROM reservation WHERE ${searchParams}`;
        const result = await db.readFromDatabase(query, []);
        return result;
    }

    create = async (reservation: Reservation) => {
        const query: string = 'INSERT INTO `reservation` SET ?';
        const values = {
            reservation_date: reservation.reservation_date,
            email: reservation.email,
            room: reservation.room,
            adminApproved: reservation.adminApproved.toString(), // should be pending on create
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
        const query = `DELETE FROM reservations WHERE ${searchParams}`;

        const result = await db.executeDatabase(query, []);
        return result[0][0];
    };
}

export default new ReservationDB();

import db from './db';
import { convertSearchByToString } from '../utils/dbHelpers';
import { Reservation } from '../models/Reservation';

class ReservationDB {
    find = async (projection: string[], searchBy: Record<string, any>) => {
        const searchParams = convertSearchByToString(searchBy);
        const result = await db.executeDatabase(
            `SELECT ${projection.join(', ')} FROM reservations WHERE ${searchParams}`,
            [],
        );

        return result[0][0];
    };

    create = async (reservation: Reservation) => {
        const query = 'INSERT INTO reservations (date, time, email, room) ';
        const values = `VALUES 
        ('${reservation.date}', 
        '${reservation.time}', 
        '${reservation.email}', 
        '${reservation.room}')`;

        const result = await db.executeDatabase(query + values, []);
        return result[0][0];
    };

    delete = async (searchBy: Record<string, any>) => {
        const searchParams = convertSearchByToString(searchBy);
        const query = `DELETE FROM reservations WHERE ${searchParams}`;

        const result = await db.executeDatabase(query, []);
        return result[0][0];
    };
}

export default new ReservationDB();

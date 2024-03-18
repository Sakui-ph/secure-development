import db from './db';
import { Inquiry } from '../models/Inquiry';

class InquiryDB {
    create = async (inquiry: Inquiry) => {
        const query = 'INSERT INTO inquiries (name, phone, email, concern) ';
        const values: string = `VALUES 
        ('${inquiry.name}', 
        '${inquiry.phone}', 
        '${inquiry.email}', 
        '${inquiry.concern}')`;

        const result = await db.queryDatabase(query + values, []);
        return result[0][0];
    };
}

export default new InquiryDB();

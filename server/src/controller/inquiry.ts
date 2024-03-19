import { Request, Response } from 'express';
import { Inquiry } from '../models/Inquiry';
import InquiryDB from '../database/inquiry';
import { LogError, LogType } from '../utils/logger';

module.exports = {
    createInquiry: async (req: Request, res: Response): Promise<any> => {
        const newInquiry: Inquiry = {
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            concern: req.body.concern,
        };
        try {
            const result = await InquiryDB.create(newInquiry);
            res.send(result.data).status(200);
        } catch (e) {
            if (e instanceof Error) {
                LogError('Error creating inquiry', e, LogType.TRANSACTION);
            }
        }
    },
};

export default module.exports;

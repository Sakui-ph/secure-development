import { Request, Response } from 'express';
import { Feedback } from '../models/Feedback';
import FeedbackDB from '../database/feedback';
import { LogError, LogType } from '../utils/logger';

//add the find all?

module.exports = {
    createFeedback: async (req: Request, res: Response): Promise<void> => {
        const newFeedback: Feedback = {
            author: req.body.author,
            comment: req.body.comment,
            photo: req.body.photo, // Assuming the photo is already processed and stored in the database
        };
    
        try {
            const result = await FeedbackDB.create(newFeedback);
            res.send(result.data).status(200);
        } catch (e) {
            if (typeof e === 'string') {
                LogError(e, 'Error creating user', LogType.TRANSACTION);
            }
            if (e instanceof Error) {
                LogError(e.message, 'Error creating user', LogType.TRANSACTION);
            }
        }
    },
}

export default module.exports;

import { Request, Response } from 'express';
import AnnouncementDB from '../database/announcement';
import { LogError, LogType } from '../utils/logger';
import { Announcement } from '../models/Announcement';

module.exports = {
    createAnnouncement: async (req: Request, res: Response) => {
        const newAnnouncement: Announcement = {
            content: req.body.text,
        };
        try {
            const result = await AnnouncementDB.create(newAnnouncement);
            res.send(result).status(200);
        } catch (e) {
            if (e instanceof Error) {
                LogError('Error creating announcement', e, LogType.TRANSACTION);
            }
            res.send('Error creating announcement').status(500);
        }
    },

    getAnnouncement: async (req: Request, res: Response) => {
        // const projection = ['text'];
        // const searchBy = { id: req.params.id };
        try {
            const result = await AnnouncementDB.findAll();
            return result;
        } catch (e) {
            if (e instanceof Error) {
                LogError('Error finding announcement', e, LogType.TRANSACTION);
            }
            res.status(500).send('Error finding announcement');
        }
    },

    deleteAnnouncement: async (req: Request, res: Response) => {
        const searchBy = { id: req.params.id };
        try {
            const result = await AnnouncementDB.delete(searchBy);
            res.send(result).status(200);
        } catch (e) {
            if (e instanceof Error) {
                LogError('Error deleting announcement', e, LogType.TRANSACTION);
            }
            res.status(500).send('Error deleting announcement');
        }
    },
};
export default module.exports;

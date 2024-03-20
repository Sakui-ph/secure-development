import { Request, Response } from 'express';
import { Announcement } from '../models/Announcement';
import AnnouncementDB from '../database/announcement';
import { LogError, LogType, LogWarning } from '../utils/logger';
import fs from 'fs';

module.exports = {
    createAnnouncement: async (req: Request, res: Response) => {
        let image_data: Buffer | undefined = req.file?.buffer;
        if (image_data === undefined) {
            image_data = fs.readFileSync(
                '../../resources/default-profile-picture.jpg',
            );
        }
        const newAnnouncement = {
            text: req.body.text,
            image_data: image_data,
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
        const projection = ['text', 'image'];
        const searchBy = { id: req.params.id }; 
        try {
            const result = await AnnouncementDB.find(projection, searchBy);
            res.send(result).status(200);
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
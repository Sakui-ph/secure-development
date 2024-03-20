import express, { Request, Response } from 'express';
import announcementController from '../controller/announcement';
import { LogError, LogInfo, LogType } from '../utils/logger';
import asyncify from 'express-asyncify';
import bodyParser from 'body-parser';
import { uploadFormdata } from '../utils/multerHandler';

const extendedParser = bodyParser.urlencoded({ extended: true });

const router = asyncify(express.Router());

router.post(
    '/create',
    express.json(),
    extendedParser,
    uploadFormdata,
    async (req: Request, res: Response) => {
        try {
            const result = await announcementController.createAnnouncement(
                req,
                res,
            );
            if (!result) {
                LogInfo(
                    `Announcement created successfully!`,
                    LogType.TRANSACTION,
                );
                //return res.status(200).send('Announcement created successfully!');
            } else {
                LogError(
                    'Error creating announcement',
                    result,
                    LogType.TRANSACTION,
                );
                return res.status(500).send('Error creating announcement');
            }
        } catch (e) {
            LogError(
                'Error creating announcement',
                e as Error,
                LogType.TRANSACTION,
            );
            //return res.status(500).send('Error creating announcement');
        }
    },
);

router.get('/read', async (req: Request, res: Response) => {
    try {
        const announcements = await announcementController.getAnnouncement(
            req,
            res,
        );
        res.send(announcements).status(200);
    } catch (e) {
        LogError(
            'Error fetching announcements',
            e as Error,
            LogType.TRANSACTION,
        );
        res.send('Error fetching announcements').status(500);
    }
});

export { router as AnnouncementRoutes };

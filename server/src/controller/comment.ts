import { Request, Response } from 'express';
import { Comment } from '../models/Comment';
import CommentDB from '../database/comment';
import { LogError, LogType, LogWarning } from '../utils/logger';

module.exports = {
    createComment: async (req: Request, res: Response): Promise<any> => {
        const newComment: Comment = {
            author: req.body.author,
            content: req.body.content,
            createdAt: new Date(),
            announcementId: req.body.announcementId,
        };
        try {
            const result = await CommentDB.create(newComment);
            res.send(result).status(200);
        } catch (e) {
            if (e instanceof Error) {
                LogError('Error creating comment', e, LogType.TRANSACTION);
            }
            res.status(500).send('Error creating comment');
        }
    },

    getComment: async (req: Request, res: Response): Promise<any> => {
        try {
            const allComments = await CommentDB.find();
            res.send(allComments).status(200);
        } catch (e) {
            if (e instanceof Error) {
                LogError('Error fetching all comments', e, LogType.TRANSACTION);
            }
            res.status(500).send('Error fetching all comments');
        }
    },

    deleteComment: (searchBy: string[]) => {
        return async (req: Request, res: Response): Promise<any> => {
            const searchObject: Record<string, any> = {};

            searchBy.forEach((key) => {
                if (req.body[key] !== undefined) {
                    searchObject[key] = req.body[key];
                }
            });

            try {
                const result = await CommentDB.delete(searchObject);
                res.send(result).status(200);
            } catch (e) {
                if (e instanceof Error && e.stack !== undefined) {
                    //LogError(e.stack, LogType.TRANSACTION);
                }
                res.status(500).send('Error deleting comment');
            }
        };
    },
};

export default module.exports;

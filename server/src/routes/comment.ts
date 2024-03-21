import express, { Request, Response } from 'express';
import commentController from '../controller/comment'; // Import your comment controller
import { LogError, LogInfo, LogType } from '../utils/logger';
import asyncify from 'express-asyncify';
import bodyParser from 'body-parser';
import { uploadFormdata } from '../utils/multerHandler';
import { validateLoggedIn } from '../middleware/securityUtils';
import inputValidation from '../middleware/inputValidation';

const extendedParser = bodyParser.urlencoded({ extended: true });

const router = asyncify(express.Router());

router.post(
    '/create',
    validateLoggedIn,
    express.json(),
    extendedParser,
    uploadFormdata,
    inputValidation.sanitizeComment,
    async (req: Request, res: Response) => {
        try {
            const result = await commentController.createComment(req, res);
            if (!result) {
                LogInfo(`Comment created successfully!`, LogType.TRANSACTION);
                res.send('Comment created successfully!').status(200);
            } else {
                LogError('Error creating comment', result, LogType.TRANSACTION);
                res.send('Error creating comment').status(500);
            }
        } catch (e) {
            LogError('Error creating comment', e as Error, LogType.TRANSACTION);
            res.send('Error creating comment').status(500);
        }
    },
);

router.get('/read', validateLoggedIn, async (req: Request, res: Response) => {
    try {
        const comments = await commentController.getComments(req, res);
        res.send(comments).status(200);
    } catch (e) {
        LogError('Error fetching comments', e as Error, LogType.TRANSACTION);
        res.send('Error fetching comments').status(500);
    }
});

/*router.get(
    '/find-all',
    async (req: Request, res: Response) => {
        try {
            const comments = await commentController.getComment();
            res.send(comments).status(200);
        } catch (e) {
            LogError('Error finding comments', e as Error, LogType.TRANSACTION);
            res.send('Error finding comments').status(500);
        }
    },
);

router.delete(
    '/delete/:id',
    async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const result = await commentController.deleteComment(id);
            if (!result) {
                LogInfo(`Comment deleted successfully!`, LogType.TRANSACTION);
                res.send('Comment deleted successfully!').status(200);
            } else {
                LogError('Error deleting comment', result, LogType.TRANSACTION);
                res.send('Error deleting comment').status(500);
            }
        } catch (e) {
            LogError('Error deleting comment', e as Error, LogType.TRANSACTION);
            res.send('Error deleting comment').status(500);
        }
    },
);*/

export { router as CommentRoutes };

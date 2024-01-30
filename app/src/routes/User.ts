import express, {Router, Request, Response, NextFunction} from 'express';
import db from '../database/db';

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    var result = db.queryDatabase("SELECT * FROM users", ["id", "username", "password"])
    .then((result) => {
        if (result != null)
            res.status(200).send(result)
        else
            res.send("No users found")
    })
})

export { router as UserRoutes }
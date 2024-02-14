import express, {Router, Request, Response, NextFunction} from 'express';
import db from '../database/db';
import user from '../controller/user';
import { hashPassword, validatePassword } from '../utils/securityUtils';
import UserDB from '../database/user';

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

router.get('/read', (req: Request, res: Response, next: NextFunction) => {
    var result = UserDB.find("first_name, last_name", {email: req.query.email}).then((result) => {
        console.log(result);
    })
})

router.post('/login', validatePassword, (req: Request, res: Response, next: NextFunction) => {
    
}),

router.post('/create', hashPassword, (req: Request, res: Response, next: NextFunction) => {
    var result = user.createUser(req, res)
    console.log(res.status);
})

router.patch('/update', hashPassword, (req: Request, res: Response, next: NextFunction) => {
    var result = user.updateUser(req, res)
    console.log(res.status);
})

export { router as UserRoutes }
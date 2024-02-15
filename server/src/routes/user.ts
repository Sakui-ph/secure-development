import express, {Router, Request, Response, NextFunction} from 'express';
import db from '../database/db';
import controller from '../controller/user';
import { hashPassword, validatePassword, setSession, validateSession } from '../utils/securityUtils';
import UserDB from '../database/user';
import { UserType } from '../models/User';

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
    res.send();
})

router.post('/login', validatePassword, setSession, (req: Request, res: Response, next: NextFunction) => {
    console.log(`User login ID is: ${req.session.user}`)
    console.log(`Session in Login is: ${req.sessionID}`)
    res.send("Login successful").status(200)
})

router.post('/logout', validateSession(), (req: Request, res: Response, next: NextFunction) => {
    req.session.user = null
    req.session.save(function (err) {
        if (err) console.log("Error saving session on logout")
    })

    req.session.regenerate(function (err) {
        if (err) console.log("Error regenerating session on logout")
        res.send("Logout successful").status(200)
    })
})

router.post('/validateSession', validateSession(), (req: Request, res: Response, next: NextFunction) => {

})

router.post('/create', hashPassword, (req: Request, res: Response, next: NextFunction) => {
    var result = controller.createUser(req, res)
    //console.log(res.status);
})

router.patch('/update', hashPassword, (req: Request, res: Response, next: NextFunction) => {
    var result = controller.updateUser(req, res)
    console.log(res.status);
})

export { router as UserRoutes }
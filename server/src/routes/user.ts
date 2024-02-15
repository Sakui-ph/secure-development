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
    res.status(200).send("Login successful")
})

router.post('/logout', validateSession([UserType.ADMIN, UserType.USER]), (req: Request, res: Response, next: NextFunction) => {
    req.session.user = null
    req.session.save(function (err) {
        if (err) console.log("Error saving session on logout")
    })

    req.session.regenerate(function (err) {
        if (err) console.log("Error regenerating session on logout")
        res.redirect('/')
    })
})

router.post('/validateSession', validateSession([UserType.USER]), (req: Request, res: Response, next: NextFunction) => {
    console.log(`Session in Validation is: ${req.sessionID}`)
    console.log("User session is: ", req.session.user)
    res.status(200).send("Session is valid")
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
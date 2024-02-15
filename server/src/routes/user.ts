import express, {Router, Request, Response, NextFunction} from 'express';
import db from '../database/db';
import controller from '../controller/user';
import { hashPassword, validatePassword, setSession, validateSession } from '../utils/securityUtils';
import UserDB from '../database/user';
import { UserType } from '../models/User';
import { checkEmail, checkUser } from '../utils/inputValidation';
import { validationResult } from 'express-validator';

const router = express.Router();


router.get('/read', checkEmail, (req: Request, res: Response, next: NextFunction) => {
    var err = validationResult(req)
    if (!err.isEmpty()) {
        res.status(400).send(err.array())
    }
    var result = UserDB.find("first_name, last_name", {email: req.query.email}).then((result) => {
        console.log(result);
    })
    res.send();
})

router.post('/login', validatePassword, setSession, (req: Request, res: Response, next: NextFunction) => {
    console.log(`User login ID is: ${req.session.user}`)
    console.log(`Session in Login is: ${req.sessionID}`)
    res.send({success: true}).status(200)
})

router.post('/logout', (req: Request, res: Response, next: NextFunction) => {
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

router.post('/create', checkUser, hashPassword, (req: Request, res: Response, next: NextFunction) => {
    var err = validationResult(req)
    if (!err.isEmpty()) {
        res.status(400).send(err.array())
    }
    var result = controller.createUser(req, res)
})

// UNUSED AS OF RN
router.patch('/update', checkUser, hashPassword, (req: Request, res: Response, next: NextFunction) => {
    var result = controller.updateUser(req, res)
    res.send(result).status(200)
})

export { router as UserRoutes }
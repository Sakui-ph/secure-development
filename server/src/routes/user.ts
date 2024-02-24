import express, {Router, Request, Response, NextFunction} from 'express';
import controller from '../controller/user';
import { hashPassword, validatePassword, setSession, validateSession } from '../utils/securityUtils';
import UserDB from '../database/user';
import { UserParams, UserType } from '../models/User';
import { checkEmail, checkUser } from '../utils/inputValidation';
import { validationResult } from 'express-validator';

const router = express.Router();

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
    console.log("deleting user session");

    req.session.regenerate(function (err) {
        if (err) console.log("Error regenerating session on logout")
        res.send("Logout successful").status(200)
    })
})

router.post('/validateSession', validateSession(), (req: Request, res: Response, next: NextFunction) => {

})

router.get('/read', checkEmail, (req: Request, res: Response, next: NextFunction) => {
    var err = validationResult(req)
    if (!err.isEmpty()) {
        res.status(400).send(err.array())
    }
    var result = UserDB.find([UserParams.FIRST_NAME, UserParams.LAST_NAME], {email: req.query.email}).then((result) => {
        console.log(result);
    })
    res.send();
})


router.post('/create', checkUser, hashPassword, (req: Request, res: Response, next: NextFunction) => {
    var err = validationResult(req)
    if (!err.isEmpty()) {
        res.status(400).send(err.array())
    }
    var result = controller.createUser(req, res)
    console.log(typeof(result))
})

router.patch('/update', 
    checkUser,
    controller.updateUser(["first_name", "last_name", "phone_number"], ["email"]), 
    (req: Request, res: Response, next: NextFunction) => {
    console.log("User updated")
    res.send("User updated").status(200)
})

export { router as UserRoutes }
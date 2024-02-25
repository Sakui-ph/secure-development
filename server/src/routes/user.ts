import express, {Router, Request, Response, NextFunction} from 'express';
import controller from '../controller/user';
import { hashPassword, validatePassword, setSession, validateSession } from '../utils/securityUtils';
import UserDB from '../database/user';
import { UserParams, UserType } from '../models/User';
import { validationResult } from 'express-validator';
import inputValidtion from '../utils/inputValidation';

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

router.get('/read',
inputValidtion.checkEmail,
controller.getUser([UserParams.FIRST_NAME, UserParams.LAST_NAME], [UserParams.EMAIL]), 
(req: Request, res: Response, next: NextFunction) => {
    res.send();
})

// TODO: fix all the checkers
router.post('/create', 
inputValidtion.checkUser,
hashPassword, 
(req: Request, res: Response, next: NextFunction) => {
    var err = validationResult(req)
    if (!err.isEmpty()) {
        res.status(400).send(err.array())
    }
    var result = controller.createUser(req, res)
    console.log(typeof(result))
})

router.patch('/update', 
    inputValidtion.checkUser,
    controller.updateUser([UserParams.FIRST_NAME, UserParams.LAST_NAME, UserParams.PHONE_NUMBER], [UserParams.EMAIL]), 
    (req: Request, res: Response, next: NextFunction) => {
    console.log("User updated")
    res.send("User updated").status(200)
})

export { router as UserRoutes }
import express, {Router, Request, Response, NextFunction} from 'express';
import controller from '../controller/user';
import { hashPassword, validatePassword, setSession, validateSession } from '../middleware/securityUtils';
import UserDB from '../database/user';
import { UserParams, UserType } from '../models/User';
import { validationResult } from 'express-validator';
import inputValidtion from '../middleware/inputValidation';
import { LogError } from '../utils/logger';

const router = express.Router();

router.post('/login', validatePassword, setSession, (req: Request, res: Response, next: NextFunction) => {
    res.send({success: true}).status(200)
})

router.post('/logout', (req: Request, res: Response, next: NextFunction) => {
    req.session.user = null
    req.session.save(function (err) {
        if (err) LogError(err, "Error saving session on logout")
    })

    req.session.regenerate(function (err) {
        if (err) LogError(err, "Error regenerating session on logout")
        res.send("Logout successful").status(200)
    })
})

router.post('/validateSession', validateSession(), (req: Request, res: Response, next: NextFunction) => {

})

router.get('/read', inputValidtion.checkEmail,
controller.getUser([UserParams.FIRST_NAME, UserParams.LAST_NAME], [UserParams.EMAIL]), 
(req: Request, res: Response, next: NextFunction) => {
    res.send();
})

router.post('/create', inputValidtion.checkUser, hashPassword, 
(req: Request, res: Response, next: NextFunction) => {
    var validationError = validationResult(req)
    if (!validationError.isEmpty()) {
        res.status(400).send(validationError.array())
    }
    var result = controller.createUser(req, res)
    res.send("User created").status(200)
})

router.patch('/update', inputValidtion.checkUser,
    controller.updateUser([UserParams.FIRST_NAME, UserParams.LAST_NAME, UserParams.PHONE_NUMBER], [UserParams.EMAIL]), 
    (req: Request, res: Response, next: NextFunction) => {
    res.send("User updated").status(200)
})

export { router as UserRoutes }
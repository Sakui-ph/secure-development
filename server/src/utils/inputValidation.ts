import { query, body, checkSchema, check, validationResult } from "express-validator";
import {Request, Response, NextFunction} from 'express';
import path from "path";




module.exports.checkEmail = [
    check('email')
        .trim()
        .normalizeEmail()
        .escape()
        .not().isEmpty().withMessage('Email is required')
        .bail()
        .isEmail().withMessage('Invalid email')
        .bail().matches(/^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@[-A-Za-z0-9]+[.][-A-Za-z0-9]{2,}$/).withMessage('Invalid email'),
    (req : Request, res : Response, next : NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }
        console.log(`Email is valid as ${req.query.email}`);
        next();
    }
]

export const customValidators = { // check image hex / file sig
    isImage: (value : any, filename : string) : any => {
        var extension = (path.extname(filename)).toLowerCase();
        switch (extension) {
            case '.jpg':
                return '.jpg';
            case '.jpeg':
                return '.jpeg';
            case  '.png':
                return '.png';
            default:
                return false;
        }
    }
}

export const validateProfilePicture = body('profile_picture').custom((value, {req}) => {
    if (req.file === undefined) {
        return false;
    }
    return customValidators.isImage(value, req.file.originalname);
})

export const checkUser = checkSchema({
    email: {
        in: ['query', 'body'],
        trim: true,
        isEmail: {
            errorMessage: 'Invalid email'
        },
    },
    password: {
        in: ['body'],
        isLength: {
            options: {min: 8},
            errorMessage: 'Password must be at least 8 characters long'
        }
    },
    phone_number: {
        in: ['body'],
        trim: true,
        matches: {
            options: /^(09|\+639)\d{9}$/,
            errorMessage: 'Invalid phone number'
        }
    },
    first_name: {
        in: ['body'],
        trim: true,
    },
    last_name: {
        in: ['body'],
        trim : true,
    },
    profile_picture: {
        in: ['body'],
        optional: true,
        custom: {
            options: (value, {req}) => {
                if (req.file === undefined) {
                    return false;
                }
                return customValidators.isImage(value, req.file.originalname);
            }
        }
    }
},
)

export default module.exports;
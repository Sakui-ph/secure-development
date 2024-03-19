import { checkSchema, check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { LogError, LogType } from '../utils/logger';

const PNG_BLOB_SIGNATURE = '89504e470d0a1a0a';
const JPEG_BLOB_SIGNATURE = 'ffd8ff';

const validateEmail = check('email')
    .trim()
    .normalizeEmail()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Email is required')
    .bail()
    .isEmail()
    .withMessage('Invalid email')
    .bail()
    .matches(
        /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@[-A-Za-z0-9]+[.][-A-Za-z0-9]{2,}$/,
    )
    .withMessage('Invalid email');

const validateProfilePicture = check('profile_picture')
    .custom((value, { req }) => {
        const buffer = req.file.buffer;
        if (buffer === undefined) return true;

        const pngHeading = buffer.toString('hex').slice(0, 16);
        const jpegHeading = buffer.toString('hex').slice(0, 6);

        console.log(pngHeading === PNG_BLOB_SIGNATURE);
        console.log(jpegHeading === JPEG_BLOB_SIGNATURE);
        // check if headings match
        if (pngHeading === PNG_BLOB_SIGNATURE) {
            return '.png';
        } else if (jpegHeading === JPEG_BLOB_SIGNATURE) {
            return '.jpeg';
        } else {
            LogError('Invalid image format', null, LogType.AUTH);
            return false;
        }
    })
    .withMessage('Invalid image format (nice try)');

const checkUser = checkSchema({
    email: {
        in: ['body'],
        trim: true,
        normalizeEmail: true,
        escape: true,
        notEmpty: {
            errorMessage: 'Email is required',
        },
        isEmail: {
            errorMessage: `Invalid email`,
        },
        matches: {
            options:
                /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@[-A-Za-z0-9]+[.][-A-Za-z0-9]{2,}$/,
            errorMessage: 'Invalid email format!',
        },
    },
    password: {
        in: ['body'],
        isLength: {
            options: { min: 8 },
            errorMessage: 'Password must be at least 8 characters long',
        },
    },
    phone_number: {
        in: ['body'],
        trim: true,
        matches: {
            options: /^(09|\+639)\d{9}$/,
            errorMessage: 'Invalid phone number',
        },
    },
    first_name: {
        in: ['body'],
        trim: true,
        isAlpha: {
            errorMessage: 'First name must only contain letters',
        },
    },
    last_name: {
        in: ['body'],
        trim: true,
        isAlpha: {
            errorMessage: 'Last name must only contain letters',
        },
    },
});

module.exports = {
    checkEmail: [
        validateEmail,
        (req: Request, res: Response, next: NextFunction) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(errors.array());
            }
            next();
        },
    ],
    checkUser: [
        checkUser,
        (req: Request, res: Response, next: NextFunction) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                LogError(JSON.stringify(errors.array()), null, LogType.AUTH);
                return res.status(400).json(errors.array());
            }
            next();
        },
    ],
    checkProfilePicture: [
        validateProfilePicture,
        (req: Request, res: Response, next: NextFunction) => {
            console.log(req.file?.filename);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                LogError(JSON.stringify(errors.array()), null, LogType.AUTH);
                return res.status(400).json(errors.array());
            }
            next();
        },
    ],
};

export default module.exports;

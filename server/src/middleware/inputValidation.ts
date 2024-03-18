import { checkSchema, check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { LogDebug, LogError, LogType } from '../utils/logger';
import path from 'path';

const PNG_BLOB_SIGNATURES = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const JPEG_BLOB_SIGNATURES = [0xff, 0xd8, 0xff];

const customValidators = {
    // check image hex / file sig
    isImage: (value: any, filename: string): any => {
        LogDebug(`Validating image: ${filename} with value ${value}`);

        const signatures = {
            png: PNG_BLOB_SIGNATURES,
            jpeg: JPEG_BLOB_SIGNATURES,
        };

        const extension = path.extname(filename).toLowerCase();
        switch (extension) {
            case '.jpg':
                return '.jpg';
            case '.jpeg':
                return '.jpeg';
            case '.png':
                return '.png';
            default:
                return false;
        }

        LogDebug(`Extension: ${signatures}`);
    },
};

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

const validateProfilePicture = check('profile_picture').custom(
    (value, { req }) => {
        return customValidators.isImage(value, req.file.originalname);
    },
);

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
                LogError(
                    JSON.stringify(errors.array()),
                    'Validation error',
                    LogType.AUTH,
                );
                return res.status(400).json(errors.array());
            }
            next();
        },
    ],
    checkProfilePicture: [
        validateProfilePicture,
        (req: Request, res: Response, next: NextFunction) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                LogError(
                    JSON.stringify(errors.array()),
                    'Validation error',
                    LogType.AUTH,
                );
                return res.status(400).json(errors.array());
            }
            next();
        },
    ],
};

export default module.exports;

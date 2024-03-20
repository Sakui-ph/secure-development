import { checkSchema, check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { LogError, LogType } from '../utils/logger';
import fs from 'fs';
import { deleteFile, deleteTmpFiles } from '../utils/fileManagement';

const PNG_BLOB_SIGNATURE = '89504e470d0a1a0a';
const JPEG_BLOB_SIGNATURE = 'ffd8ff';
const PDF_BLOB_SIGNATURE = '255044462d312e';

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

const validatePDF = check('clientIdFile')
    .custom((value, { req }) => {
        if (req.session.user === undefined) {
            LogError('Session user is not defined', null, LogType.AUTH);
            deleteTmpFiles();
            return false;
        }

        const oldPath = `uploads/tmp/${req.session.user}/${req.body.clientIdFile}`;
        const newPath = `uploads/tmp/${req.session.user}/${req.body.clientIdFile}`;
        fs.mkdirSync(`uploads/tmp/${req.session.user}`, { recursive: true });

        let pdfHeading = '';

        try {
            const data = fs.readFileSync(oldPath, 'utf8');
            const buf = Buffer.from(data, 'ascii');
            pdfHeading = buf.toString('hex').slice(0, 14);
        } catch (err) {
            LogError('Error reading file', err as Error, LogType.AUTH);
            deleteFile(oldPath);
            return false;
        }

        if (pdfHeading !== PDF_BLOB_SIGNATURE) {
            deleteFile(oldPath);
            LogError('Invalid pdf format', null, LogType.AUTH);
            return false;
        }

        try {
            fs.renameSync(oldPath, newPath);
        } catch (err) {
            LogError('Error renaming file', err as Error, LogType.AUTH);
            deleteFile(oldPath);
            return false;
        }

        return '.pdf';
    })
    .withMessage('Invalid pdf format (nice try)');

const validateProfilePicture = check('profile_picture')
    .custom((value, { req }) => {
        const buffer = req.file.buffer;
        if (buffer === undefined) return true;

        const pngHeading = buffer.toString('hex').slice(0, 16);
        const jpegHeading = buffer.toString('hex').slice(0, 6);

        // check if headings match
        if (
            pngHeading !== PNG_BLOB_SIGNATURE &&
            jpegHeading !== JPEG_BLOB_SIGNATURE
        ) {
            LogError('Invalid image format', null, LogType.AUTH);
            return false;
        }

        return true;
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
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                LogError(JSON.stringify(errors.array()), null, LogType.AUTH);
                return res.status(400).json(errors.array());
            }
            next();
        },
    ],
    checkClientIDPDF: [
        validatePDF,
        (req: Request, res: Response, next: NextFunction) => {
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

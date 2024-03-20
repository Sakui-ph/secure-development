import multer from 'multer';
import { LogError, LogType } from './logger';
import path from 'path';
import fs from 'fs';
const memoryEngine = multer.memoryStorage();
const storageEnginePDF = multer.diskStorage({
    destination: (req, file, callback) => {
        const path = `./uploads/tmp/${req.session.user}`;
        fs.mkdirSync(path, { recursive: true });
        callback(null, path);
    },
    filename: (req, file, callback) => {
        const filename =
            file.fieldname +
            '-' +
            Date.now() +
            req.session.user +
            path.extname(file.originalname);
        req.body.clientIdFile = filename;
        callback(null, filename);
    },
});

export const uploadProfilePicture = multer({
    storage: memoryEngine,
    fileFilter: function (req, file, callback) {
        const ext = path.extname(file.originalname);

        if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            LogError('Only images are allowed', null, LogType.TRANSACTION);
            return callback(new Error('Only images are allowed'));
        }
        if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
            LogError('Only images are allowed', null, LogType.TRANSACTION);
            return callback(new Error('Only images are allowed'));
        }

        callback(null, true);
    },
    limits: {
        fileSize: 1024 * 1024 * 10,
    },
}).single('profile_picture');

export const uploadFormdata = multer({
    storage: memoryEngine,
}).none();

export const uploadPDF = multer({
    storage: storageEnginePDF,
    fileFilter: function (req, file, callback) {
        const ext = path.extname(file.originalname);
        if (req.session.user === undefined) {
            LogError('Session user is not defined', null, LogType.TRANSACTION);
            return callback(new Error('Session user is not defined'));
        }
        if (ext !== '.pdf') {
            LogError('Only PDFs are allowed', null, LogType.TRANSACTION);
            return callback(new Error('Only PDFs are allowed'));
        }
        if (file.mimetype !== 'application/pdf') {
            LogError('Only PDFs are allowed', null, LogType.TRANSACTION);
            return callback(new Error('Only PDFs are allowed'));
        }

        callback(null, true);
    },
    limits: {
        fileSize: 209715200, //25mb
    },
});

export const uploadPDFBuffer = multer({
    storage: memoryEngine,
    fileFilter: function (req, file, callback) {
        const ext = path.extname(file.originalname);
        if (ext !== '.pdf') {
            LogError('Only PDFs are allowed', null, LogType.TRANSACTION);
            return callback(new Error('Only PDFs are allowed'));
        }
        if (file.mimetype !== 'application/pdf') {
            LogError('Only PDFs are allowed', null, LogType.TRANSACTION);
            return callback(new Error('Only PDFs are allowed'));
        }

        callback(null, true);
    },
    limits: {
        fileSize: 209715200, //25mb
    },
});

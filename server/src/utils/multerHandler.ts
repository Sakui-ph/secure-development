import multer from 'multer';
import { LogError, LogType } from './logger';
import path from 'path';
const storageEngine = multer.memoryStorage();

export const uploadProfilePicture = multer({
    storage: storageEngine,
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
    storage: storageEngine,
}).none();
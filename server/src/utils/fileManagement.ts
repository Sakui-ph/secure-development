import fs from 'fs';
import { LogError, LogType } from './logger';

const UPLOAD_TMP_PATH = 'uploads/tmp';

export const deleteFile = (path: string) => {
    fs.unlink(path, (err) => {
        if (err) {
            deleteTmpFiles();
            LogError(
                "Error deleting file, you're probably screwed",
                err,
                LogType.AUTH,
            );
        }
    });
};

export const deleteTmpFiles = () => {
    const path = UPLOAD_TMP_PATH;
    fs.rm(path, { recursive: true }, (err) => {
        if (err) {
            LogError(
                "Error deleting file, you're probably extra screwed",
                err,
                LogType.AUTH,
            );
        }
    });
};

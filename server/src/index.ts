import express, { Application } from 'express';
import { UserRoutes } from './routes/user';
import { RoomRoutes } from './routes/room';
import * as dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import { sessionConfig } from './config/sessionConfig';
import morgan from 'morgan';
import { logger } from './utils/logger';
import { LoggerStream } from './utils/logger';
import https from 'https';
import fs from 'fs';
import path from 'path';
import asyncify from 'express-asyncify';
import { AdminRoutes } from './routes/admin';
import { AnnouncementRoutes } from './routes/announcement';
import { CommentRoutes } from './routes/comment';

dotenv.config();

const app: Application = asyncify(express());
// app.use(morganMiddleware);
app.use(
    morgan(
        '[:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
        { stream: new LoggerStream() },
    ),
);

let options = {};
// if using https
if (process.env.STATUS === 'prod') {
    options = {
        key: fs.readFileSync(
            path.resolve(__dirname, '../certificate/localhost-key.pem'),
        ),
        cert: fs.readFileSync(
            path.resolve(__dirname, '../certificate/localhost.pem'),
        ),
        rejectUnauthorized: false,
    };
}

let PORT: string | undefined;
process.env.STATUS === 'dev'
    ? (PORT = process.env.DEV_PORT)
    : (PORT = process.env.PROD_PORT);

if (process.env.STATUS === 'dev') {
    app.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}`);
    });
} else if (process.env.STATUS === 'prod') {
    https.createServer(options, app).listen(PORT, () => {
        logger.info(`Server is running on HTTPS port ${PORT}`);
    });
}

app.use(session(sessionConfig));

const corsOptions = {
    origin: [
        'https://localhost:3000',
        'http://localhost:5555',
        'http://localhost:3000',
        'https://localhost:5555',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
};
app.use(cors(corsOptions));

app.use('/user', UserRoutes);
app.use('/admin', AdminRoutes);
app.use('/roomreservation', RoomRoutes);
app.use('/announcement', AnnouncementRoutes);
app.use('/comment', CommentRoutes);

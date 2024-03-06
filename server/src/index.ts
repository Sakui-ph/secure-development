import express, { Application } from 'express';
import { UserRoutes } from './routes/user';
import * as dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';
import { sessionConfig } from './config/sessionConfig';
import morgan from 'morgan';
import { logger } from './utils/logger';
import { LoggerStream } from './utils/logger';

dotenv.config();

const app: Application = express();
// app.use(morganMiddleware);
app.use(
    morgan(
        '[:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
        { stream: new LoggerStream() },
    ),
);

let PORT: string | undefined;
process.env.STATUS === 'dev'
    ? (PORT = process.env.DEV_PORT)
    : (PORT = process.env.PROD_PORT);

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});

app.use(session(sessionConfig));

const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);

const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:5555'],
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
};
app.use(cors(corsOptions));

app.use('/user', UserRoutes);

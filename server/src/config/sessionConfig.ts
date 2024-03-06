import { SessionOptions } from 'express-session';

export const sessionConfig: SessionOptions = {
    secret: process.env.SESSION_SECRET || 'secret',
    name: 'sessionID',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: true,
        httpOnly: false,
    },
};

import winston, { Logger, createLogger, format } from 'winston';

const { combine, timestamp, colorize, printf, label } = format;

const levels = {
    info: 0,
    warn: 1,
    error: 2,
    trace: 3,
    http: 4,
    debug: 5,
};

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'blue',
    trace: 'magenta',
    http: 'cyan',
};

const consoleTransport = new winston.transports.Console({
    format: combine(colorize()),
    level: 'debug',
});

const allTransport = new winston.transports.File({
    filename: './logs/all.log',
    format: combine(format.uncolorize()),
    level: 'debug',
});

const timestampFormat = 'YYYY-MM-DD hh:mm:ss.SSS';

winston.addColors(colors);

const logHeaders = {
    error: '[ERROR]',
    warn: '[WARN]',
    info: '[INFO]',
    debug: '[DEBUG]',
    trace: '[TRACE]',
};

export enum LogType {
    NONE = 'NONE',
    AUTH = 'AUTH',
    TRANSACTION = 'TRANSACTION',
    ADMIN = 'ADMIN',
    DEBUG = 'DEBUG',
}

const loggerFormat = printf(({ level, message, label, timestamp }) => {
    return `[${level}] ${timestamp} [${label}] ${message}`;
});

const defaultFormat = printf(({ level, message, timestamp }) => {
    return `[${level}] ${timestamp} ${message}`;
});

export const logger: Logger = createLogger({
    levels: levels,
    format: combine(timestamp({ format: timestampFormat }), defaultFormat),
    transports: [consoleTransport, allTransport],
});

export const debugLogger: Logger = createLogger({
    levels: levels,
    format: combine(
        label({ label: LogType.DEBUG.toString() }),
        colorize({ all: true }),
        timestamp({ format: timestampFormat }),
        loggerFormat,
    ),
    transports: [
        new winston.transports.File({
            filename: './logs/debug.log',
            level: 'debug',
            format: format.uncolorize(),
        }),
        allTransport,
    ],
});

export const authLogger: Logger = createLogger({
    levels: levels,
    format: combine(
        label({ label: LogType.AUTH.toString() }),
        colorize({ all: true }),
        timestamp({ format: timestampFormat }),
        loggerFormat,
    ),
    transports: [
        new winston.transports.File({
            filename: './logs/auth.log',
            format: format.uncolorize(),
        }),
        allTransport,
    ],
});

export const transactionLogger: Logger = createLogger({
    levels: levels,
    format: combine(
        label({ label: LogType.TRANSACTION.toString() }),
        colorize({ all: true }),
        timestamp({ format: timestampFormat }),
        loggerFormat,
    ),
    transports: [
        new winston.transports.File({
            filename: './logs/transaction.log',
            format: format.uncolorize(),
        }),
        allTransport,
    ],
});

export const adminLogger: Logger = createLogger({
    levels: levels,
    format: combine(
        label({ label: LogType.ADMIN.toString() }),
        colorize({ all: true }),
        timestamp({ format: timestampFormat }),
        loggerFormat,
    ),
    transports: [
        new winston.transports.File({
            filename: './logs/admin.log',
            format: format.uncolorize(),
        }),
        allTransport,
    ],
});

export const httpLogger: Logger = createLogger({
    level: 'http',
    format: combine(
        label({ label: 'HTTP' }),
        colorize({ all: true }),
        timestamp({ format: timestampFormat }),
        loggerFormat,
    ),
    transports: [
        new winston.transports.File({
            filename: './logs/http.log',
            level: 'http',
            format: combine(format.uncolorize()),
        }),
        allTransport,
    ],
});

if (process.env.STATUS === 'dev') {
    authLogger.add(consoleTransport);
    transactionLogger.add(consoleTransport);
    adminLogger.add(consoleTransport);
    httpLogger.add(consoleTransport);
    debugLogger.add(consoleTransport);
}

export const LogError = (
    generic = 'An error has occurred',
    error: Error | null = null,
    type: LogType = LogType.NONE,
) => {
    let message = ' ';
    if (process.env.STATUS !== 'dev' || error === null) {
        message = `${generic}`;
    } else {
        message = error.stack || error.message || error.toString();
    }

    switch (type) {
        case LogType.AUTH:
            authLogger.log('error', message);
            break;
        case LogType.TRANSACTION:
            transactionLogger.log('error', message);
            break;
        case LogType.ADMIN:
            adminLogger.log('error', message);
            break;
        default:
            logger.log('error', message);
    }
};

export const LogWarning = (
    warning: string,
    generic = 'A warning has occurred',
    type: LogType = LogType.NONE,
) => {
    const time = new Date().toISOString();
    if (process.env.STATUS !== 'dev') {
        console.log(`${logHeaders.warn}[${time}] ${generic}`);
    }

    switch (type) {
        case LogType.AUTH:
            authLogger.log('warn', warning);
            break;
        case LogType.TRANSACTION:
            transactionLogger.log('warn', warning);
            break;
        case LogType.ADMIN:
            adminLogger.log('warn', warning);
            break;
        default:
            logger.log('warn', warning);
    }
};

export const LogInfo = (info: string, type: LogType = LogType.NONE) => {
    if (typeof info === 'object') {
        info = JSON.stringify(info);
    }
    switch (type) {
        case LogType.AUTH:
            authLogger.log('info', info);
            break;
        case LogType.TRANSACTION:
            transactionLogger.log('info', info);
            break;
        case LogType.ADMIN:
            adminLogger.log('info', info);
            break;
        default:
            logger.log('info', info);
    }
};

export class LoggerStream {
    write(message: string) {
        httpLogger.log('http', message.substring(0, message.lastIndexOf('\n')));
    }
}

export const LogDebug = (debug: string) => {
    if (process.env.STATUS === 'dev') debugLogger.log('debug', debug);
};

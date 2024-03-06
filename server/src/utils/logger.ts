import winston, { Logger, createLogger, format, transports } from 'winston';

const { combine, timestamp, colorize, printf, label } = format;

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
    trace: 4,
};

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'blue',
    trace: 'magenta',
};

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
}

const loggerFormat = printf(({ level, message, label, timestamp }) => {
    return `[${level}] ${timestamp} [${label}] ${message}`;
});

export const logger: Logger = createLogger({
    levels: levels,
    format: combine(
        label({ label: LogType.NONE.toString() }),
        colorize({ all: true }),
        timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A' }),
        loggerFormat,
    ),
    transports: [new winston.transports.Console()],
});

export const authLogger: Logger = createLogger({
    levels: levels,
    format: combine(
        label({ label: LogType.AUTH.toString() }),
        colorize({ all: true }),
        timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A' }),
        loggerFormat,
    ),
    transports: [new winston.transports.File({ filename: './logs/auth.log' })],
});

export const transactionLogger: Logger = createLogger({
    levels: levels,
    format: combine(
        label({ label: LogType.TRANSACTION.toString() }),
        colorize({ all: true }),
        timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A' }),
        loggerFormat,
    ),
    transports: [
        new winston.transports.File({ filename: './logs/transaction.log' }),
    ],
});

export const adminLogger: Logger = createLogger({
    levels: levels,
    format: combine(
        label({ label: LogType.ADMIN.toString() }),
        colorize({ all: true }),
        timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A' }),
        loggerFormat,
    ),
    transports: [new winston.transports.File({ filename: './logs/admin.log' })],
});

if (process.env.STATUS === 'dev') {
    authLogger.add(new transports.Console({}));
    transactionLogger.add(new transports.Console({}));
    adminLogger.add(new transports.Console({}));
}

export const LogError = (
    error: Error,
    generic = 'An error has occurred',
    type: LogType = LogType.NONE,
) => {
    const time = new Date().toISOString();
    if (process.env.STATUS !== 'dev') {
        console.log(`${logHeaders.error}[${time}] ${generic}`);
    }

    switch (type) {
        case LogType.AUTH:
            authLogger.log('error', error);
            break;
        case LogType.TRANSACTION:
            transactionLogger.log('error', error);
            break;
        case LogType.ADMIN:
            adminLogger.log('error', error);
            break;
        default:
            logger.log('error', error);
    }
};

export const LogWarning = (
    warning: Error,
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

export const LogDebug = (debug: string) => {
    if (process.env.STATUS === 'dev') logger.log('debug', debug);
};

export default LogError;

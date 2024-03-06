const logHeaders = {
    error: '[ERROR]',
    warn: '[WARN]',
    info: '[INFO]',
    debug: '[DEBUG]',
    trace: '[TRACE]',
};

export const LogError = (error : Error, generic = 'An error has occurred') => {
    let time = new Date().toISOString();
    console.log(`[${logHeaders.error}][${time}] ${generic}`);
    if (process.env.REACT_APP_DEBUG !== 'true') {
        return error;
    }
    console.trace(error);
    throw error;
};

export const LogWarning = (warning : Error, generic = 'A warning has occurred') => {
    let time = new Date().toISOString();
    console.log(`[${logHeaders.warn}][${time}] ${generic}`);
    if (process.env.REACT_APP_DEBUG !== 'true') {
        return warning;
    }
    console.trace(warning);
};

export const LogInfo = (info : string) => {
    let time = new Date().toISOString();
    console.log(`[${logHeaders.info}][${time}] ${info}`);
};



export default LogError;



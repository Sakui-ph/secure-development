export const LogError = (error, generic = 'An error has occurred') => {
    if (process.env.REACT_APP_DEBUG !== 'true') {
        console.log(generic);
        return error;
    }
    console.trace(error);
    throw error;
};

export default LogError;

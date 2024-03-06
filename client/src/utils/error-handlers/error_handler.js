export const LogError = (error, prod_msg = 'An error has occurred') => {
    if (process.env.REACT_APP_DEBUG === 'true') console.error(prod_msg);
    else console.error(error.message);
    return error;
};

export default LogError;

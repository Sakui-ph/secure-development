export const LogError = (error, generic = 'An error has occurred') => {
    if (process.env.REACT_APP_DEBUG !== 'true') {
        console.log(generic);
        // const { data } = error.response;
        // data.array.forEach((element) => {
        //     console.log(element.msg);
        // });
        // console.log(error.response.data.msg);
        return error;
    }
    console.trace(error);
    throw error;
};

export default LogError;

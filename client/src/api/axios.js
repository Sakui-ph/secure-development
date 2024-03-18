import axios from 'axios';
import { LogError } from '../utils/error-handlers/error-logger';

const DEVELOPMENT_BASE_URL = process.env.REACT_APP_HTTPS
    ? 'https://localhost:5555'
    : 'http://localhost:5555';

export const BASE_URL = DEVELOPMENT_BASE_URL;

export const userEndpoints = (endpoint) => {
    axios.defaults.withCredentials = true;
    axios.defaults.headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
    };
    const url = `${BASE_URL}/user/${endpoint}`;

    return {
        fetch: (username) => axios.get(url, { params: { username } }),
        post: (data) =>
            axios
                .post(url, data, {
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                    },
                })
                .catch((error) => {
                    LogError(error, 'Request failed');
                }),
        patch: (data) =>
            axios
                .patch(url, data, {
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                    },
                })
                .catch((error) => {
                    LogError(error, 'Request failed');
                }),
        get: () =>
            axios.get(url).catch((error) => LogError(error, 'Request failed')),
        create: (formData) =>
            axios
                .post(url, formData, {
                    headers: {
                        'content-type': 'multipart/form-data',
                    },
                })
                .catch((error) => {
                    LogError(error, 'Request failed');
                }),
    };
};

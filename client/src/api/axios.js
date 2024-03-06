import axios from 'axios';
import { LogError } from '../utils/error-handlers/error-logger';

const DEVELOPMENT_BASE_URL = 'http://localhost:5555';

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
                    LogError(error, 'POST request failed');
                }),
        patch: (data) =>
            axios
                .patch(url, data, {
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                    },
                })
                .catch((error) => {
                    LogError(error, 'PATCH request failed');
                }),
        get: () =>
            axios
                .get(url)
                .catch((error) => LogError(error, 'GET request failed')),
    };
};

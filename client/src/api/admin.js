import { LogError } from '../utils/error-handlers/error-logger';
import { createAPIEndpoints } from './axios';
import { ADMIN_ENDPOINTS } from './endpoints';

export const readAllUsers = async () => {
    const result = await createAPIEndpoints(ADMIN_ENDPOINTS.readAll)
        .post()
        .catch((error) => {
            LogError(error, 'An error occurred while reading all users');
        });
    return result;
};

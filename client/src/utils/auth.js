import { createAPIEndpoints } from '../api/axios';
import { USER_ENDPOINTS } from '../api/endpoints';
import { UserType } from '../models/user';
import { LogError } from './error-handlers/error-logger';

export const isAuthenticated = async (allowedTypes) => {
    let result = false;
    try {
        await createAPIEndpoints(USER_ENDPOINTS.validate_session)
            .post({ data: allowedTypes })
            .then((response) => {
                if (response.data.auth) {
                    result = true;
                } else {
                    result = false;
                }
            });
    } catch (error) {
        LogError(error, 'An error occurred while validating session');
    }
    return result;
};

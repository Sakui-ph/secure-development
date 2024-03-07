import { userEndpoints } from '../api/axios';
import { ENDPOINTS } from '../api/endpoints';
import { UserType } from '../models/user';
import { LogError } from './error-handlers/error-logger';

export const isAuthenticated = async (allowedTypes) => {
    let result = false;
    try {
        await userEndpoints(ENDPOINTS.validate_session)
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

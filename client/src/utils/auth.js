import { userEndpoints } from '../api/axios';
import { ENDPOINTS } from '../api/endpoints';
import { UserType } from '../models/user';
import { LogError } from './error-handlers/error_handler';

export const isAuthenticated = async (allowedTypes) => {
    let result = false;
    let admin = !!allowedTypes.includes(UserType.ADMIN);
    let user = !!allowedTypes.includes(UserType.USER);

    try {
        await userEndpoints(ENDPOINTS.validate_session)
            .post({ admin, user })
            .then((response) => {
                admin = null;
                user = null;
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

import { userEndpoints } from '../api/axios'
import { ENDPOINTS } from '../api/endpoints'
import { UserType } from '../models/user';

export const isAuthenticated = async (allowedTypes)  => {
    let result = false;
    let admin = allowedTypes.includes(UserType.ADMIN)? true : false;
    let user = allowedTypes.includes(UserType.USER)? true : false;

    try {
        const response = await userEndpoints(ENDPOINTS.validate_session).post({admin: admin, user: user}).then((response) => {
            admin = null;
            user = null;
            if (response.data.auth) {
                result = true;
            } else {
                result = false;
            }
        });
    } catch (error) {
        if (error.status === 401) {
            return false
        }
    }
    return result;
}



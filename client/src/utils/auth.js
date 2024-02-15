import { userEndpoints } from '../api/axios'
import { ENDPOINTS } from '../api/endpoints'
import { UserType } from '../models/user';

export const isAuthenticated = async (allowedTypes)  => {
    console.log(allowedTypes)
    let result = false;
    let admin = allowedTypes.includes(UserType.ADMIN)? true : false;
    let user = allowedTypes.includes(UserType.USER)? true : false;

    try {
        console.log("Checking if user is authenticated")
        const response = await userEndpoints(ENDPOINTS.validate_session).post({admin: admin, user: user}).then((response) => {
            admin = null;
            user = null;
            if (response.data.auth) {
                console.log(response.data.message)
                console.log("User is authenticated")
                result = true;
            } else {
                console.log("User is not authenticated")
                result = false;
            }
        });
    } catch (error) {
        if (error.status === 401) {
            console.log("User is not authenticated")
            return false
        }
    }
    return result;
}



import { userEndpoints } from '../api/axios'
import { ENDPOINTS } from '../api/endpoints'

export const isAuthenticated = async (admin = false)  => {
    try {
        await userEndpoints(ENDPOINTS.validate_session).post({admin : admin}).then((response) => {
            if (response.status === 200) {
                console.log("User is authenticated")
                return true
            } else
            console.log("User is not authenticated")
            return false;
        });
    } catch (error) {
        if (error.status === 401) {
            console.log("User is not authenticated")
            return false
        }

    }
   
}



import { userEndpoints } from '../api/axios'
import { ENDPOINTS } from '../api/endpoints'

export const isAuthenticated = async (admin = false)  => {
    let result = false;
    try {
        console.log("Checking if user is authenticated")
        await userEndpoints(ENDPOINTS.validate_session).post({admin : admin}).then((response) => {
            console.log(`AUTH = ${response.data.auth}`)
            if (response.data.auth) {

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



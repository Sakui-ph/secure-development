import { userEndpoints } from "./axios"
import { ENDPOINTS } from "./endpoints"

export const Login = async (email, password) => {
    let result = false;
    try {
        await userEndpoints(ENDPOINTS.login).post({email: email, password: password}).then((response) => {
            if (response.status === 200) {
                console.log("Login successful");
                result = true;
                return true;
            }
            else {
                console.log("Login failed");
                return false;
            }
        })
    }
    catch (error) {
        console.log("An error occurred while logging in.");
        return false
    }
    return result;
}

export const Logout = async () => {
    try {
        await userEndpoints(ENDPOINTS.logout).post()
    }
    catch (error) {
        console.log("An error occurred while logging out");
    }
    
}
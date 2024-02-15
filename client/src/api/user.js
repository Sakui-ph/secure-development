import { userEndpoints } from "./axios"
import { ENDPOINTS } from "./endpoints"

export const Login = async () => {
    console.log("Login attempted");
    try {
        await userEndpoints(ENDPOINTS.login).post({email: "throwaway@gmail.com", password: "fljsadhfiuadf"}).then((response) => {
            if (response.status === 200) {
                console.log("Login successful");
                
            }
            else {
                console.log("Login failed");
            }
        })
    }
    catch (error) {
        console.log("An error occurred while logging in.");
    }
    
}

export const Logout = async () => {
    try {
        await userEndpoints(ENDPOINTS.logout).post()
    }
    catch (error) {
        console.log("An error occurred while logging out");
    }
    
}
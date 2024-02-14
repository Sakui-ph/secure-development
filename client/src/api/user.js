import { userEndpoints } from "./axios"
import { ENDPOINTS } from "./endpoints"

export const Login = async () => {
    console.log("Login attempted");
    try {
        await userEndpoints(ENDPOINTS.login).post({email: "throwaway@gmail.com", password: "fljsadhfiuadf"})
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
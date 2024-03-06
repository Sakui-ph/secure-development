import { LogError } from '../utils/error-handlers/error_handler';
import { userEndpoints } from './axios';
import { ENDPOINTS } from './endpoints';

export const Login = async (email, password) => {
    let result = false;
    try {
        await userEndpoints(ENDPOINTS.login)
            .post({ email, password })
            .then((response) => {
                if (response.data.success) {
                    result = true;
                    return true;
                }

                return false;
            });
    } catch (error) {
        LogError(error, 'An error occurred while logging in, login failed');
        return false;
    }
    return result;
};

export const Logout = async () => {
    try {
        await userEndpoints(ENDPOINTS.logout).post();
    } catch (error) {
        LogError(error, 'An error occurred while logging out, logout failed');
        return false;
    }
};

export const CreateNewUser = async ({
    prefix_id,
    first_name,
    last_name,
    email,
    password,
    phone_number,
    profile_picture = null,
}) => {
    await userEndpoints(ENDPOINTS.create)
        .post({
            prefix_id,
            first_name,
            last_name,
            email,
            password,
            phone_number,
            profile_picture,
        })
        .catch((error) => {
            LogError(error, 'An error occurred while creating a new user');
        });
};

export function CreateNewAdmin({
    prefix_id,
    first_name,
    last_name,
    email,
    password,
    phone_number,
    profile_picture,
}) {
    userEndpoints(ENDPOINTS.create)
        .post({
            prefix_id,
            first_name,
            last_name,
            email,
            password,
            phone_number,
            profile_picture,
        })
        .catch((error) => {
            LogError(error, 'An error occurred while creating a new user');
        });
}

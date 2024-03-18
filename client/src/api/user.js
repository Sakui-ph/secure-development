import { LogError } from '../utils/error-handlers/error-logger';
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
    // place all the data in a FormData object
    const formData = new FormData();
    formData.append('prefix_id', prefix_id);
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phone_number', phone_number);
    formData.append('profile_picture', profile_picture);

    await userEndpoints(ENDPOINTS.create)
        .create(formData)
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

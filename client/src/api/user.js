import { LogError } from '../utils/error-handlers/error-logger';
import { createAPIEndpoints } from './axios';
import { USER_ENDPOINTS } from './endpoints';

export const Login = async (email, password) => {
    let result = false;
    try {
        await createAPIEndpoints(USER_ENDPOINTS.login)
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
        await createAPIEndpoints(USER_ENDPOINTS.logout).post();
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

    await createAPIEndpoints(USER_ENDPOINTS.create)
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
    createAPIEndpoints(USER_ENDPOINTS.create)
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

export const UpdatePrefixId = async (email, newPrefixId) => {
    try {
        await createAPIEndpoints(USER_ENDPOINTS.update_prefix_id)
            .patch({ email, newPrefixId })
            .then((response) => {
                if (response.data.success) {
                    console.log('Prefix ID updated successfully');
                } else {
                    console.log('Failed to update prefix ID');
                }
            });
    } catch (error) {
        LogError(error, 'An error occurred while updating prefix ID');
    }
};

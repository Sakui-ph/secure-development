import { userEndpoints } from './axios';
import { ENDPOINTS } from './endpoints';

export const Login = async (email, password) => {
    let result = false;
    try {
        await userEndpoints(ENDPOINTS.login)
            .post({ email, password })
            .then((response) => {
                if (response.data.success) {
                    console.log('Login successful');
                    result = true;
                    return true;
                }

                console.log('Login failed');
                return false;
            });
    } catch (error) {
        console.log('An error occurred while logging in.');
        return false;
    }
    return result;
};

export const Logout = async () => {
    try {
        await userEndpoints(ENDPOINTS.logout).post();
    } catch (error) {
        console.log('An error occurred while logging out');
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
    console.log('enter');
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
        .then((response) => {
            console.log('User added to SQL:', response.data);
        })
        .catch((error) => {
            console.log(error.response);
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
        .then((response) => {
            console.log('User added to SQL:', response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}

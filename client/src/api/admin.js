import { LogError } from '../utils/error-handlers/error-logger';
import { createAPIEndpoints } from './axios';
import { ADMIN_ENDPOINTS } from './endpoints';

export const readAllUsers = async () => {
    const result = await createAPIEndpoints(ADMIN_ENDPOINTS.readAll)
        .post()
        .catch((error) => {
            LogError(error, 'An error occurred while reading all users');
        });
    return result;
};

export const UpdatePrefixId = async (email, newPrefixId) => {
    try {
        console.log('Email:', email, 'New Prefix ID:', newPrefixId);

        await createAPIEndpoints(ADMIN_ENDPOINTS.update_prefix_id)
            .patch({ email, newPrefixId })
            .then((response) => {
                if (response.data.success) {
                    console.log('Prefix ID updated successfully');
                } else {
                    LogError(
                        'An error occurred while updating prefix ID',
                        response.data.error,
                    );
                }
            });
    } catch (error) {
        LogError(error, 'An error occurred while updating prefix ID');
    }
};

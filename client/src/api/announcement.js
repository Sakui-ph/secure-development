import { LogError } from '../utils/error-handlers/error-logger';
import { createAPIEndpoints } from './axios';
import { ANNOUNCEMENT_ENDPOINTS } from './endpoints';

export const CreateAnnouncement = async ({ content }) => {
    const formData = new FormData();
    formData.append('content', content);

    await createAPIEndpoints(ANNOUNCEMENT_ENDPOINTS.create)
        .create(formData)
        .catch((error) => {
            LogError(
                error,
                'An error occurred while creating a new announcement',
            );
        });
};

export const GetAnnouncement = async () => {
    try {
        const response = await createAPIEndpoints(
            ANNOUNCEMENT_ENDPOINTS.read,
        ).fetch();
        return response.data;
    } catch (error) {
        LogError('Error fetching announcement:', error);
        throw error;
    }
};

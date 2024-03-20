import { LogError } from '../utils/error-handlers/error-logger';
import { announcementEndpoints } from './axios';
import { ENDPOINTS } from './endpoints';

export const CreateAnnouncement = async ({ text, image }) => {
    const formData = new FormData();
    formData.append('text', text);
    formData.append('image', image);

    await announcementEndpoints(ENDPOINTS.create)
        .create(formData)
        .catch((error) => {
            LogError(
                error,
                'An error occurred while creating a new announcement',
            );
        });
}
import { LogError } from '../utils/error-handlers/error-logger';
import { createAPIEndpoints } from './axios';
import { ANNOUNCEMENT_ENDPOINTS } from './endpoints';

export const CreateAnnouncement = async ({ text, image }) => {
    const formData = new FormData();
    formData.append('text', text);
    formData.append('image', image);

    await createAPIEndpoints(ANNOUNCEMENT_ENDPOINTS.create)
        .create(formData)
        .catch((error) => {
            LogError(
                error,
                'An error occurred while creating a new announcement',
            );
        });
};

export const fetchAnnouncement = () => {
    createAPIEndpoints(ANNOUNCEMENT_ENDPOINTS.read)
        .fetch()
        .then((data) => {
            setAnnouncement(data);
        })
        .catch((error) => {
            LogError('Error fetching announcements:', error);
        });
};

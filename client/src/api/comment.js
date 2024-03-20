import { LogError } from '../utils/error-handlers/error-logger';
import { createAPIEndpoints } from './axios';
import { COMMENT_ENDPOINTS } from './endpoints';

export const CreateComment = async ({
    author,
    content,
    createdAt,
    announcementId,
}) => {
    const formData = new FormData();
    // formData.append('id', id);
    formData.append('author', author);
    formData.append('content', content);
    formData.append('createdAt', createdAt);
    formData.append('announcementId', announcementId);

    console.log('Form Data:', formData.get('date'));
    await createAPIEndpoints(COMMENT_ENDPOINTS.create)
        .create(formData)
        .catch((error) => {
            LogError(error, 'An error occurred while creating a new comment');
        });
};

export const GetComments = async () => {
    try {
        const response = await createAPIEndpoints(
            COMMENT_ENDPOINTS.read,
        ).fetch();
        return response.data;
    } catch (error) {
        LogError('Error fetching comments:', error);
        throw error;
    }
};

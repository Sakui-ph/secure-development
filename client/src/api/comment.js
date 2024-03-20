import { LogError } from '../utils/error-handlers/error-logger';
import { createAPIEndpoints } from './axios';
import { COMMENT_ENDPOINTS } from './endpoints';

export const CreateComment = async ({ author, content, createdAt }) => {
    const formData = new FormData();
    // formData.append('id', id);
    formData.append('author', author);
    formData.append('content', content);
    formData.append('createdAt', createdAt);

    console.log('Form Data:', formData.get('date'));
    await createAPIEndpoints(COMMENT_ENDPOINTS.create)
        .create(formData)
        .catch((error) => {
            LogError(error, 'An error occurred while creating a new comment');
        });
};

export const fetchAllComments = () => {
    createAPIEndpoints(COMMENT_ENDPOINTS.create)
        .fetch()
        .then((data) => {
            setComments(data);
        })
        .catch((error) => {
            LogError('Error fetching comments:', error);
        });
};

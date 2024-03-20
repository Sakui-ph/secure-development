import { LogError } from '../utils/error-handlers/error-logger';
import { commentEndpoints } from './axios';
import { ENDPOINTS } from './endpoints';

export const CreateComment = async ({ author, text, date }) => {
    const formData = new FormData();
    // formData.append('id', id);
    formData.append('author', author);
    formData.append('text', text);
    formData.append('date', date);

    console.log('Form Data:', formData.get('date'));
    await commentEndpoints(ENDPOINTS.create)
        .create(formData)
        .catch((error) => {
            LogError(
                error,
                'An error occurred while creating a new comment',
            );
        });
};

export const fetchAllComments = () => {
    commentEndpoints(ENDPOINTS.create)
        .fetch()
        .then((data) => {
            setComments(data);
        })
        .catch((error) => {
            LogError('Error fetching comments:', error);
        });
};
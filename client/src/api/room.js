import { LogError } from '../utils/error-handlers/error-logger';
import { createAPIEndpoints } from './axios';
import { ROOM_ENDPOINTS } from './endpoints';

export const CreateRoomReservation = async ({ date, room, clientIdFile }) => {
    const formData = new FormData();
    formData.append('date', date);
    formData.append('room', room);
    formData.append('clientIdFile', clientIdFile);

    console.log('Form Data:', formData.get('date'));
    await createAPIEndpoints(ROOM_ENDPOINTS.create)
        .create(formData)
        .catch((error) => {
            LogError(
                error,
                'An error occurred while creating a new room reservation',
            );
        });
};

export const getRoomReservations = async () => {
    try {
        const response = await createAPIEndpoints(ROOM_ENDPOINTS.read).fetch();
        return response.data;
    } catch (error) {
        LogError('Error fetching room reservations:', error);
        throw error;
    }
};

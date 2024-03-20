import { LogError } from '../utils/error-handlers/error-logger';
import { createAPIEndpoints } from './axios';
import { ROOM_ENDPOINTS } from './endpoints';

export const CreateRoomReservation = async ({ date, time, email, room }) => {
    const formData = new FormData();
    // formData.append('id', id);
    formData.append('date', date);
    formData.append('time', time);
    formData.append('email', email);
    formData.append('room', room);

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

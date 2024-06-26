import { LogError } from '../utils/error-handlers/error-logger';
import { createAPIEndpoints } from './axios';
import { ROOM_ENDPOINTS } from './endpoints';

export const CreateRoomReservation = async ({ date, room, clientIdFile }) => {
    const formData = new FormData();
    formData.append('date', date);
    formData.append('room', room);
    formData.append('clientIdFile', clientIdFile);

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

export const getAllRoomReservations = async () => {
    try {
        const response = await createAPIEndpoints(
            ROOM_ENDPOINTS.readAll,
        ).fetch();
        return response.data;
    } catch (error) {
        LogError('Error fetching all room reservations:', error);
        throw error;
    }
};

export const updateRoomReservation = async (reservationId, newStatus) => {
    try {
        const response = await createAPIEndpoints(ROOM_ENDPOINTS.patch).patch({
            id: reservationId,
            adminApproved: newStatus,
        });
        return response.data;
    } catch (error) {
        LogError('Error updating room reservation:', error);
        throw error;
    }
};

export const cancelRoomReservation = async (reservationId) => {
    try {
        const response = await createAPIEndpoints(ROOM_ENDPOINTS.cancel).cancel(
            {
                id: reservationId,
            },
        );
        return response.data;
    } catch (error) {
        LogError('Error cancelling room reservation:', error);
        throw error;
    }
};

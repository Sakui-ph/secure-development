import React, { useState, useEffect } from 'react';
import { getRoomReservations, cancelRoomReservation } from '../../api/room';
import { LogError, LogInfo } from '../../utils/error-handlers/error-logger';

const ViewReservationPage = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const currentReservations = await getRoomReservations();
                setReservations(currentReservations);
            } catch (error) {
                LogError(error, 'Error fetching reservations:');
            }
        };

        fetchReservations();
    }, []);

    const handleCancelReservation = (id) => {
        LogInfo(`Canceling reservation with ID: ${id}`);
        console.log('Cancel reservation with id:', id);
        cancelRoomReservation(id);
    };

    return (
        <div>
            <h1>Current Reservations</h1>
            <ul>
                {reservations && reservations.length > 0 ? (
                    reservations.map((reservation) => (
                        <li key={reservation.id}>
                            <p>Date: {reservation.reservation_date}</p>
                            <p>Room: {reservation.room}</p>
                            <p>Approval Status: {reservation.adminApproved}</p>
                            <p>
                                Reservation Status:
                                {reservation.reservationStatus}
                            </p>
                            <button
                                onClick={() =>
                                    handleCancelReservation(reservation.id)
                                }
                                type="button"
                            >
                                Cancel
                            </button>
                        </li>
                    ))
                ) : (
                    <li>No reservations found</li>
                )}
            </ul>
        </div>
    );
};

export default ViewReservationPage;

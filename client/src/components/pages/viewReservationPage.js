import React, { useState, useEffect } from 'react';
import { getRoomReservations } from '../../api/room';

const ViewReservationPage = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const currentReservations = await getRoomReservations();
                setReservations(currentReservations);
            } catch (error) {
                console.error('Error fetching reservations:', error);
            }
        };

        fetchReservations();
    }, []);

    const handleCancelReservation = (id) => {
        console.log('Cancel reservation with id:', id);
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
                            <p>Status: {reservation.adminApproved}</p>
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

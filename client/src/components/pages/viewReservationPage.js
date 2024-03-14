import React, { useState, useEffect } from 'react';

const ViewReservationPage = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        // sample info - ardcoded for now
        const getCurrentReservations = () => [
            { id: 1, date: '2024-03-15', time: '10:00 AM', room: 'Room 1' },
            { id: 2, date: '2024-03-16', time: '11:00 AM', room: 'Room 2' },
            { id: 3, date: '2024-03-17', time: '12:00 PM', room: 'Room 1' },
        ];

        const fetchReservations = async () => {
            const currentReservations = getCurrentReservations();
            setReservations(currentReservations);
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
                {reservations.map((reservation) => (
                    <li key={reservation.id}>
                        <p>Date: {reservation.date}</p>
                        <p>Time: {reservation.time}</p>
                        <p>Room: {reservation.room}</p>
                        <button
                            onClick={() =>
                                handleCancelReservation(reservation.id)
                            }
                            type="button"
                        >
                            Cancel
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewReservationPage;

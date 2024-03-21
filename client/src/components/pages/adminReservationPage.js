import React, { useState, useEffect } from 'react';
import { getAllRoomReservations } from '../../api/room';

const AdminReservationPage = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        getAllRoomReservations().then((data) => {
            setReservations(data);
        });
    }, []);

    const handleStatusChange = (reservationId, newStatus) => {
        setReservations((prevReservations) =>
            prevReservations.map((reservation) =>
                reservation.id === reservationId
                    ? { ...reservation, status: newStatus }
                    : reservation,
            ),
        );
    };

    const handleApprove = (reservationId) => {
        handleStatusChange(reservationId, 'approved');
    };

    const handleReject = (reservationId) => {
        handleStatusChange(reservationId, 'rejected');
    };

    return (
        <div>
            <h1>Admin Reservation Page</h1>
            <table>
                <thead>
                    <tr>
                        <th>Reservation Date</th>
                        <th>User Email</th>
                        <th>Room</th>
                        <th>Admin Approval Status</th>
                        <th>Client ID</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((reservation) => (
                        <tr key={reservation.id}>
                            <td>{reservation.reservation_date}</td>
                            <td>{reservation.email}</td>
                            <td>{reservation.room}</td>
                            <td>{reservation.adminApproved}</td>
                            <td>{reservation.clientId}</td>
                            <td>
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleApprove(reservation.id)
                                    }
                                >
                                    Approve
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleReject(reservation.id)}
                                >
                                    Reject
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminReservationPage;

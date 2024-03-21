import React, { useState, useEffect } from 'react';
import { getAllRoomReservations, updateRoomReservation } from '../../api/room';

const AdminReservationPage = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        getAllRoomReservations().then((data) => {
            setReservations(data);
        });
    }, []);

    const handleStatusChange = (id, newStatus) => {
        setReservations(
            reservations.map((reservation) => {
                if (reservation.id === id) {
                    return { ...reservation, adminApproved: newStatus };
                }
                return reservation;
            }),
        );
    };

    const handleApprove = async (reservation) => {
        if (!reservation || !reservation.id) {
            console.error('Invalid reservation object:', reservation);
            return;
        }

        handleStatusChange(reservation.id, 'approved');
        await updateRoomReservation(reservation.id, 'approved');
    };

    const handleReject = async (reservation) => {
        if (!reservation || !reservation.id) {
            console.error('Invalid reservation object:', reservation);
            return;
        }

        handleStatusChange(reservation.id, 'rejected');
        await updateRoomReservation(reservation.id, 'rejected');
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
                    {reservations.map(
                        (reservation) =>
                            reservation.reservationStatus === 'ongoing' && (
                                <tr key={reservation.id}>
                                    <td>{reservation.reservation_date}</td>
                                    <td>{reservation.email}</td>
                                    <td>{reservation.room}</td>
                                    <td>{reservation.adminApproved}</td>
                                    <td>{reservation.clientIdFile}</td>
                                    <td>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleApprove(reservation)
                                            }
                                        >
                                            Approve
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleReject(reservation)
                                            }
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ),
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminReservationPage;

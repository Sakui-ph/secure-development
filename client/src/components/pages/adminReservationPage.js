import React, { useState } from 'react';
import { getAllRoomReservations } from '../../api/room';

const AdminReservationPage = () => {
    const [reservations, setReservations] = useState([]);
    React.useEffect(() => {
        getAllRoomReservations().then((data) => {
            setReservations(data);
        });
    }, []);

    const handleStatusChange = (reservationId, newStatus) => {
        setReservations((prevReservations) =>
            prevReservations.map((reservation) => {
                if (reservation.id === reservationId) {
                    return { ...reservation, status: newStatus };
                }
                return reservation;
            }),
        );
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
                                <select
                                    value={reservation.status}
                                    onChange={(e) =>
                                        handleStatusChange(
                                            reservation.id,
                                            e.target.value,
                                        )
                                    }
                                >
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminReservationPage;

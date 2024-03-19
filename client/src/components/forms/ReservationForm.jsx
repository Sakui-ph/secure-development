import React, { useState, useEffect } from 'react';
import { CreateRoomReservation } from '../../api/room';

export default function ReservationForm() {
    const [formFields, setFormFields] = useState({
        date: '',
        time: '',
        email: '',
        room: '',
    });

    const [submitting, setSubmitting] = useState(false);

    const handleInputChange = (e) => {
        setFormFields({ ...formFields, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
    };

    useEffect(() => {
        if (submitting) {
            console.log('Form submitted:', formFields);
            setFormFields({
                date: '',
                time: '',
                email: '',
                room: '',
            });
            CreateRoomReservation(formFields).then((response) => {
                setSubmitting(false);
            });
            setSubmitting(false);
        }
    }, [submitting, formFields]);

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h1>Rooms Reservation Form</h1>
            <label htmlFor="email">Email:</label>
            <input
                className="input"
                type="email"
                id="email"
                name="email"
                value={formFields.email}
                onChange={handleInputChange}
                required
            />
            <label htmlFor="date">Date:</label>
            <input
                className="input"
                type="date"
                id="date"
                name="date"
                value={formFields.date}
                onChange={handleInputChange}
                required
            />
            <label htmlFor="time">Time:</label>
            <input
                className="input"
                type="time"
                id="time"
                name="time"
                value={formFields.time}
                onChange={handleInputChange}
                required
            />
            <label htmlFor="room">Available rooms:</label>
            <select
                className="input"
                id="room"
                name="room"
                value={formFields.room}
                onChange={handleInputChange}
                required
            >
                <option value="">Select Room</option>
                <option value="room1">Room 1</option>
                <option value="room2">Room 2</option>
            </select>
            <button type="submit">Submit</button>
        </form>
    );
}

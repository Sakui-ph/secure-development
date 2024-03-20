import React, { useState, useEffect } from 'react';
import { CreateRoomReservation } from '../../api/room';

export default function ReservationForm() {
    const [formFields, setFormFields] = useState({
        date: '',
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
            <label htmlFor="pdf">Upload PDF:</label>
            <input
                className="input"
                type="file"
                id="pdf"
                name="pdf"
                accept=".pdf"
                // onChange={handleFileInputChange}
                required
            />
            <button type="submit">Submit</button>
        </form>
    );
}

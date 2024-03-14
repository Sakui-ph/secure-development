import React, { useState, useEffect } from 'react';

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

            setSubmitting(false);
        }
    }, [submitting, formFields]);

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h1>Amenities Reservation Form</h1>
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
            <label htmlFor="room">Amenities:</label>
            <select
                className="input"
                id="room"
                name="room"
                value={formFields.room}
                onChange={handleInputChange}
                required
            >
                <option value="">Select amenity</option>
                <option value="room1">Swimming Pool</option>
                <option value="room2">Sauna</option>
                <option value="room2">Massage</option>
                <option value="room2">Fitness Room</option>
            </select>
            <button type="submit">Submit</button>
        </form>
    );
}

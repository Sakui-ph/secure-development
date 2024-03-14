import React, { useState, useEffect } from 'react';

export default function ReservationForm() {
    const [formFields, setFormFields] = useState({
        date: '',
        time: '',
        email: '',
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
            /* Login(inputFields.email, inputFields.password).then((result) => {
                setSubmitting(false);
                if (result) window.location.href = '/home';
            }); */
            console.log('Form submitted:', formFields);

            // Reset the form after submission
            setFormFields({
                date: '',
                time: '',
                email: '',
            });

            setSubmitting(false);
        }
    }, [submitting, formFields]);

    return (
        <form className="form">
            <label htmlFor="name">Date:</label>
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
                value={formFields.phone}
                onChange={handleInputChange}
                required
            />

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

            <button type="submit">Submit</button>
        </form>
    );
}

import React, { useState, useEffect } from 'react';

export default function InquiriesForm() {
    const [formFields, setFormFields] = useState({
        name: '',
        phone: '',
        email: '',
        concern: '',
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
            /*Login(inputFields.email, inputFields.password).then((result) => {
                setSubmitting(false);
                if (result) window.location.href = '/home';
            });*/
            console.log('Form submitted:', formFields);

            // Reset the form after submission
            setFormFields({
                name: '',
                phone: '',
                email: '',
                concern: '',
            });

            setSubmitting(false);
        }
    }, [submitting, formFields]);

    return (
        <form className="form">
            <label htmlFor="name">Name:</label>
            <input
                className="input"
                type="text"
                id="name"
                name="name"
                value={formFields.name}
                onChange={handleInputChange}
                required
            />

            <label htmlFor="phone">Phone Number:</label>
            <input
                className="input"
                type="tel"
                id="phone"
                name="phone"
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

            <label htmlFor="concern">Concern:</label>
            <textarea
                className="input"
                id="concern"
                name="concern"
                value={formFields.concern}
                onChange={handleInputChange}
                rows="5"
                required
            />

            <button type="submit">Submit Inquiry</button>
        </form>
    );
};

InquiryForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

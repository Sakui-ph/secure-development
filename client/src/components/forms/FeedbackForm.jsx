import React, { useState, useEffect } from 'react';

const FeedbackForm = () => {
    const [formFields, setFormFields] = useState({
        author: '',
        comment: '',
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
            // Here you can handle your form submission logic
            console.log('Form submitted:', formFields);

            // Reset the form after submission
            setFormFields({
                author: '',
                comment: '',
            });

            setSubmitting(false);
        }
    }, [submitting, formFields]);

    return (
        <form className="feedback-form" onSubmit={handleSubmit}>
            <label htmlFor="author">Your Name:</label>
            <input
                className="input"
                type="text"
                id="author"
                name="author"
                value={formFields.author}
                onChange={handleInputChange}
                required
            />

            <label htmlFor="comment">Your Feedback:</label>
            <textarea
                className="input"
                id="comment"
                name="comment"
                value={formFields.comment}
                onChange={handleInputChange}
                rows="5"
                required
            />

            <button type="submit">Submit Feedback</button>
        </form>
    );
};
export default FeedbackForm;

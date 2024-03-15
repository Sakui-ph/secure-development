import React, { useState, useEffect } from 'react';

const FeedbackForm = () => {
    const [formFields, setFormFields] = useState({
        author: '',
        comment: '',
    });

    const [submitting, setSubmitting] = useState(false);
    const [feedbacks, setFeedbacks] = useState([
        {
            id: 1,
            author: 'John Doe',
            comment:
                'Great experience at the resort. Loved the amenities and the beautiful surroundings!',
        },
        {
            id: 2,
            author: 'Jane Smith',
            comment:
                'The staff was very friendly and helpful throughout my stay. Highly recommend!',
        },
        {
            id: 3,
            author: 'David Brown',
            comment:
                'The food was delicious and the views were breathtaking. Will definitely visit again!',
        },
    ]);

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

            // Add the new feedback to the list
            setFeedbacks([
                ...feedbacks,
                {
                    id: feedbacks.length + 1,
                    author: formFields.author,
                    comment: formFields.comment,
                },
            ]);

            // Reset the form after submission
            setFormFields({
                author: '',
                comment: '',
            });

            setSubmitting(false);
        }
    }, [submitting, formFields, feedbacks]);

    return (
        <div>
            <div className="feedback-list">
                <h2>Recent Feedbacks</h2>
                {feedbacks.map((feedback) => (
                    <div key={feedback.id} className="feedback">
                        <p>
                            <b>{feedback.author}</b>
                        </p>
                        <p>{feedback.comment}</p>
                    </div>
                ))}
            </div>
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
        </div>
    );
};

export default FeedbackForm;

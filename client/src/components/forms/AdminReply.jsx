import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function ReplyForm({ onSubmit }) {
    const [reply, setReply] = useState('');

    const handleInputChange = (e) => {
        setReply(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(reply);
        setReply('');
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="reply">Reply:</label>
            <textarea
                className="input"
                id="reply"
                name="reply"
                value={reply}
                onChange={handleInputChange}
                rows="5"
                required
            />
            <button type="submit">Submit Reply</button>
        </form>
    );
}

ReplyForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

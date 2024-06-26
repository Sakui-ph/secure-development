import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CreateComment } from '../../api/comment';
import { LogError } from '../../utils/error-handlers/error-logger';

export default function AnnouncementViewForm({
    fetchCommentData,
    announcementId,
}) {
    const [newComment, setNewComment] = useState('');
    const [submittingComment, setSubmittingComment] = useState(false);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        setSubmittingComment(true);

        const newCommentData = {
            content: newComment,
            createdAt: new Date(),
            announcementId,
        };

        try {
            await CreateComment(newCommentData);
            setNewComment('');
            setSubmittingComment(false);
            fetchCommentData(); // Refresh comments after posting comment
        } catch (error) {
            LogError(error, 'Error posting comment:');
            setSubmittingComment(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleCommentSubmit}>
                <textarea
                    value={newComment}
                    onChange={handleCommentChange}
                    placeholder="Enter your comment..."
                    required
                />
                <p> </p>
                <button type="submit" disabled={submittingComment}>
                    {submittingComment ? 'Submitting...' : 'Submit Comment'}
                </button>
            </form>
        </div>
    );
}

AnnouncementViewForm.propTypes = {
    fetchCommentData: PropTypes.func.isRequired,
    announcementId: PropTypes.number.isRequired,
};

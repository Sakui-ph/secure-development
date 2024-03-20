import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CreateComment } from '../../api/comment';

export default function AnnouncementViewForm({ fetchCommentData }) {
    const [newComment, setNewComment] = useState('');
    const [submittingComment, setSubmittingComment] = useState(false);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        setSubmittingComment(true);

        const newCommentData = {
            author: 'User', // get first name from session
            content: newComment,
            createdAt: new Date(),
            announcementId: '1', // get announcement id from session
        };

        try {
            await CreateComment(newCommentData);
            setNewComment('');
            setSubmittingComment(false);
            fetchCommentData(); // Refresh comments after posting comment
        } catch (error) {
            console.error('Error posting comment:', error);
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
};

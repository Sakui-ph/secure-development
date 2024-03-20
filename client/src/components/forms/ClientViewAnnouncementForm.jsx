import React, { useState, useEffect } from 'react';
import { GetComments, CreateComment } from '../../api/comment';
import { GetAnnouncement } from '../../api/announcement';

export default function AnnouncementViewForm() {
    const [announcement, setAnnouncement] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [submittingComment, setSubmittingComment] = useState(false);

    const fetchAnnouncementData = () => {
        GetAnnouncement()
            .then((data) => {
                setAnnouncement(data);
            })
            .catch((error) => {
                console.error('Error fetching announcement:', error);
            });
    };

    const fetchCommentData = () => {
        GetComments()
            .then((data) => {
                setComments(data);
            })
            .catch((error) => {
                console.error('Error fetching comments:', error);
            });
    };

    useEffect(() => {
        fetchAnnouncementData();
        fetchCommentData();
    }, []);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        setSubmittingComment(true);

        const newCommentData = {
            author: 'User', // get first name from session
            content: newComment,
            createdAt: new Date(),
            announcementId: '1', // get announcement id from session
        };

        CreateComment(newCommentData)
            .then(() => {
                setNewComment('');
                setSubmittingComment(false);
                fetchCommentData();
            })
            .catch((error) => {
                console.error('Error posting comment:', error);
                setSubmittingComment(false);
            });
    };

    return (
        <div>
            {announcement && (
                <div className="announcement">
                    <h2>Announcement</h2>
                    <p>{announcement.text}</p>
                </div>
            )}
            <div className="comments">
                <h3>Comments</h3>
                {comments.map((comment) => (
                    <div key={comment.id} className="comment">
                        <p>{comment.text}</p>
                        <small>
                            {comment.author} -{' '}
                            {new Date(comment.date).toLocaleString()}
                        </small>
                    </div>
                ))}
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
        </div>
    );
}

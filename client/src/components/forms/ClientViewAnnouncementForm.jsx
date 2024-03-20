import React, { useState, useEffect } from 'react';
import { fetchAllComments, postComment } from '../../api/comments'; // Import your API functions for fetching and posting comments
import { fetchAnnouncement } from '../../api/announcement'; // Import your API function for fetching announcement

export default function AnnouncementViewForm() {
    const [announcement, setAnnouncement] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [submittingComment, setSubmittingComment] = useState(false);

    const fetchAnnouncementData = () => {
        fetchAnnouncement() // Fetch announcement from API
            .then((data) => {
                setAnnouncement(data);
            })
            .catch((error) => {
                console.error('Error fetching announcement:', error);
            });
    };

    const fetchCommentData = () => {
        fetchAllComments()
            .then((data) => {
                setComments(data);
            })
            .catch((error) => {
                console.error('Error fetching comments:', error);
            });
    };

    useEffect(() => {
        fetchAnnouncementData(); // Fetch announcement on component mount
        fetchCommentData(); // Fetch all comments on component mount
    }, []);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        setSubmittingComment(true);

        const newCommentData = {
            author: 'User', // You can set the author to the current user's name or fetch it from the server
            text: newComment,
        };

        postComment(newCommentData) // Post new comment to API
            .then(() => {
                setNewComment('');
                setSubmittingComment(false);
                fetchCommentData(); // Refresh comments after posting comment
            })
            .catch((error) => {
                console.error('Error posting comment:', error);
                setSubmittingComment(false);
            });
    };

    return (
<<<<<<< HEAD
        <div>
            {announcement && (
                <div className="announcement">
                    <h2>{announcement.title}</h2>
                    <p>{announcement.text}</p>
=======
        <div className="announcement-view">
            {announcements.map((announcement) => (
                <div key={announcement.id} className="announcement">
                    <img src={announcement.imageUrl} alt="Announcement" />
                    <h2>{announcement.title}</h2>
                    <p>{announcement.text}</p>
                    <form
                        onSubmit={(e) =>
                            handleCommentSubmit(e, announcement.id)
                        }
                    >
                        <label htmlFor={`comment_${announcement.id}`}>
                            Post Comment:
                        </label>
                        <p> </p>
                        <textarea
                            id={`comment_${announcement.id}`}
                            value={newComment}
                            onChange={handleCommentChange}
                            rows="3"
                            required
                        />
                        <p> </p>
                        <button type="submit">Submit Comment</button>
                    </form>

                    <div className="comments">
                        <h1>Comments:</h1>
                        {comments
                            .filter(
                                (comment) =>
                                    comment.announcementId === announcement.id,
                            )
                            .map((comment) => (
                                <div key={comment.id} className="comment">
                                    <p>{comment.text}</p>
                                </div>
                            ))}
                    </div>
>>>>>>> 4f4e9dadab011cee2aa8a326ee51843201317c3f
                </div>
            )}
            <div className="comments">
                <h3>Comments</h3>
                {comments.map((comment) => (
                    <div key={comment.id} className="comment">
                        <p>{comment.text}</p>
                        <small>{comment.author} - {new Date(comment.date).toLocaleString()}</small>
                    </div>
                ))}
                <form onSubmit={handleCommentSubmit}>
                    <textarea
                        value={newComment}
                        onChange={handleCommentChange}
                        placeholder="Enter your comment..."
                        required
                    />
                    <button type="submit" disabled={submittingComment}>
                        {submittingComment ? 'Submitting...' : 'Submit Comment'}
                    </button>
                </form>
            </div>
        </div>
    );
}

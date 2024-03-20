import React, { useState, useEffect } from 'react';
import { GetAnnouncement } from '../../api/announcement';
import { GetComments, CreateComment } from '../../api/comment';

export default function AnnouncementViewForm() {
    const [announcement, setAnnouncement] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [submittingComment, setSubmittingComment] = useState(false);

    useEffect(() => {
        const fetchAnnouncementData = async () => {
            try {
                const data = await GetAnnouncement();
                setAnnouncement(data); // Set the announcement state with fetched data
                console.log(data);
            } catch (error) {
                console.error('Error fetching announcement:', error);
            }
        };

        fetchAnnouncementData(); // Fetch announcement data when the component mounts
    }, []);

    const fetchCommentData = async () => {
        try {
            const data = await GetComments();
            setComments(data); // Set the comments state with fetched data
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

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
            {announcement && (
                <div className="announcement">
                    <h2>Announcement</h2>
                    <p>{announcement.content}</p>
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
                    <button type="submit" disabled={submittingComment}>
                        {submittingComment ? 'Submitting...' : 'Submit Comment'}
                    </button>
                </form>
            </div>
        </div>
    );
}

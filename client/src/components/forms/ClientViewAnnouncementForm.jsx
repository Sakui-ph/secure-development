import React, { useState } from 'react';
import roomImage from '../../resources/images/room.jpg';
import '../../styles/viewAnnouncement.css';

const AnnouncementView = () => {
    /*
    const [announcements, setAnnouncements] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);
    
    useEffect(() => {
        // Fetch announcements from the API
        fetch('/api/getAnnouncements')
            .then(response => response.json())
            .then(data => setAnnouncements(data));
    }, []);

    const handleCommentSubmit = (e, announcementId) => {
        e.preventDefault();
        // Perform API call to post comment
        fetch('/api/postComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                announcementId,
                comment: newComment,
            }),
        })
        .then(response => response.json())
        .then(data => {
            // Update comments state with the new comment
            setComments([...comments, data]);
            // Clear the comment input field
            setNewComment('');
        });
    };
    */

    const [announcements, setAnnouncements] = useState([
        {
            id: 1,
            title: '20% off Summer Sale!',
            text: 'Get ready for our summer sale, all resort rooms at 20% off discount!',
            imageUrl: roomImage,
        },
    ]);

    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([
        {
            id: 1,
            announcementId: 1,
            text: 'Booking now!',
        },
    ]);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = (e, announcementId) => {
        e.preventDefault();
        const commentId = Math.floor(Math.random() * 1000) + 1;
        const newCommentData = {
            id: commentId,
            announcementId,
            text: newComment,
        };
        setComments([...comments, newCommentData]);
        setNewComment('');
    };

    return (
        <div className="announcement-view">
            {announcements.map((announcement) => (
                <div key={announcement.id} className="announcement">
                    <h2>{announcement.title}</h2>
                    <p>{announcement.text}</p>
                    <img src={announcement.imageUrl} alt="Announcement" />

                    <form
                        onSubmit={(e) =>
                            handleCommentSubmit(e, announcement.id)
                        }
                    >
                        <label htmlFor={`comment_${announcement.id}`}>
                            Post Comment:
                        </label>
                        <textarea
                            id={`comment_${announcement.id}`}
                            value={newComment}
                            onChange={handleCommentChange}
                            rows="3"
                            required
                        />
                        <button type="submit">Submit Comment</button>
                    </form>

                    <div className="comments">
                        <h3>Comments:</h3>
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
                </div>
            ))}
        </div>
    );
};

export default AnnouncementView;

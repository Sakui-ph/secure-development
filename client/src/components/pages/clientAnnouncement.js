import React, { useState, useEffect } from 'react';
import ClientViewAnnouncementForm from '../forms/ClientViewAnnouncementForm';
import { GetComments } from '../../api/comment';
import { GetAnnouncement } from '../../api/announcement';

export default function ClientViewAnnouncementPage() {
    const [announcement, setAnnouncement] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchAnnouncementData();
        fetchCommentData();
        console.log(comments);
    }, []);

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

    return (
        <div>
            <h1>View Announcement</h1>
            {announcement.map((value) => (
                <div key={value.id} className="announcement">
                    <h2>Announcement</h2>
                    <p>{value.content}</p>
                </div>
            ))}
            <div className="comments">
                <h3>Comments</h3>
                {comments.map((comment) => (
                    <div key={comment.id} className="comment">
                        <p>{comment.content}</p>
                        <small>
                            {comment.author} -{' '}
                            {new Date(comment.createdAt).toLocaleString()}
                        </small>
                    </div>
                ))}
            </div>
            <ClientViewAnnouncementForm fetchCommentData={fetchCommentData} />
        </div>
    );
}

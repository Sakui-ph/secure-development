import React, { useState, useEffect } from 'react';
import ClientViewAnnouncementForm from '../forms/ClientViewAnnouncementForm';
import { GetComments } from '../../api/comment';
import { GetAnnouncement } from '../../api/announcement';
import { LogError } from '../../utils/error-handlers/error-logger';

export default function ClientViewAnnouncementPage() {
    const [announcement, setAnnouncement] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchAnnouncementData();
        fetchCommentData();
    }, []);

    const fetchAnnouncementData = () => {
        GetAnnouncement()
            .then((data) => {
                setAnnouncement(data);
            })
            .catch((error) => {
                LogError(error, 'Error fetching announcement:');
            });
    };

    const fetchCommentData = () => {
        GetComments()
            .then((data) => {
                setComments(data);
            })
            .catch((error) => {
                LogError(error, 'Error fetching comments:');
            });
    };

    return (
        <div>
            <h1>View Announcement</h1>
            <h2>Announcement</h2>
            {announcement.length === 0 ? (
                <p>No announcement available</p>
            ) : (
                announcement.map((value) => (
                    <div>
                        <div key={value.id} className="announcement">
                            <p>{value.content}</p>
                        </div>
                        <h3>Comments</h3>
                        {comments.map(
                            (comment) =>
                                comment.announcementId === value.id && (
                                    <div key={comment.id} className="comment">
                                        <p>{comment.content}</p>
                                        <small>
                                            {comment.author} -{' '}
                                            {new Date(
                                                comment.createdAt,
                                            ).toLocaleString()}
                                        </small>
                                    </div>
                                ),
                        )}
                        <ClientViewAnnouncementForm
                            fetchCommentData={fetchCommentData}
                            announcementId={value.id}
                        />
                    </div>
                ))
            )}
        </div>
    );
}

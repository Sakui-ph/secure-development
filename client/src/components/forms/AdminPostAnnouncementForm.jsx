import React, { useState } from 'react';
import { CreateAnnouncement } from '../../api/announcement';
import { LogError } from '../../utils/error-handlers/error-logger';

export default function PostAnnouncementForm() {
    const [announcement, setAnnouncement] = useState({
        content: '',
    });

    const handleTextChange = (e) => {
        setAnnouncement({ ...announcement, content: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await CreateAnnouncement(announcement);
        } catch (error) {
            LogError(error, 'Error creating announcement:');
        }
        setAnnouncement({ content: '' });
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="announcementText">Announcement Text:</label>
            <textarea
                className="input"
                id="announcementText"
                value={announcement.content}
                onChange={handleTextChange}
                rows="5"
                required
            />
            <button type="submit">Post Announcement</button>
        </form>
    );
}

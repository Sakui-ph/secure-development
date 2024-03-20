import React, { useState } from 'react';
import { CreateAnnouncement } from '../../api/announcement';

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
            console.log('Announcement created successfully!');
        } catch (error) {
            console.error('Error creating announcement:', error);
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

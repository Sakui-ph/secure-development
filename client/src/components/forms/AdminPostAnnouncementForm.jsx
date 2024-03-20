import React, { useState } from 'react';

export default function PostAnnouncementForm() {
    const [announcement, setAnnouncement] = useState({
        text: '',
        image_data: null,
    });

    const handleTextChange = (e) => {
        setAnnouncement({ ...announcement, text: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('text', announcement.text);

        // Perform API call here to submit the form data KUNWARE
        // fetch('/api/postAnnouncement', {
        //     method: 'POST',
        //     body: formData,
        // }).then(response => {
        //     // Handle response
        // });

        // Reset form fields after submission
        setAnnouncement({ text: '' });
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="announcementText">Announcement Text:</label>
            <textarea
                className="input"
                id="announcementText"
                value={announcement.text}
                onChange={handleTextChange}
                rows="5"
                required
            />
            <button type="submit">Post Announcement</button>
        </form>
    );
}

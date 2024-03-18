import React, { useState } from 'react';

export default function PostAnnouncementForm() {
    const [announcement, setAnnouncement] = useState({
        text: '',
        image: null,
    });

    const handleTextChange = (e) => {
        setAnnouncement({ ...announcement, text: e.target.value });
    };

    const handleImageChange = (e) => {
        setAnnouncement({ ...announcement, image: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('text', announcement.text);
        formData.append('image', announcement.image);

        // Perform API call here to submit the form data KUNWARE
        // fetch('/api/postAnnouncement', {
        //     method: 'POST',
        //     body: formData,
        // }).then(response => {
        //     // Handle response
        // });

        // Reset form fields after submission
        setAnnouncement({ text: '', image: null });
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

            <label htmlFor="announcementImage">Upload Image:</label>
            <input
                className="input"
                type="file"
                id="announcementImage"
                accept="image/*"
                onChange={handleImageChange}
            />

            <button type="submit">Post Announcement</button>
        </form>
    );
}

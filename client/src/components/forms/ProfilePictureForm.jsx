import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../styles/profilePicture.css';

export default function ProfilePictureForm({
    setPreviewImage,
    setProfilePicture,
}) {
    const [submitting, setSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const file = e.target.files[0];
        setProfilePicture(file);
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
    };

    useEffect(() => {
        if (submitting) {
            setProfilePicture(null);

            setSubmitting(false);
        }
    }, [submitting, setProfilePicture]);

    return (
        <span>
            <span>
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        type="file"
                        name="profilePicture"
                        onChange={handleInputChange}
                    />
                </form>
            </span>
        </span>
    );
}

ProfilePictureForm.propTypes = {
    setPreviewImage: PropTypes.func.isRequired,
    setProfilePicture: PropTypes.func.isRequired,
};

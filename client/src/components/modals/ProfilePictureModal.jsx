import { Modal, Button } from '@mui/material';
import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import ProfilePictureForm from '../forms/ProfilePictureForm';
import '../../styles/profilePicture.css';
import defaultProfilePicture from '../../resources/images/default-profile-picture.jpg';
import { GetProfilePicture, ChangeProfilePicture } from '../../api/user';
import { LogError } from '../../utils/error-handlers/error-logger';
import { imageBufferToImage } from '../../utils/parseImage';

export default function ProfilePictureModal({ open, handleClose }) {
    const [previewImage, setPreviewImage] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchProfilePicture();
    }, []);

    const fetchProfilePicture = async () => {
        try {
            const response = await GetProfilePicture();
            const imgUrl = imageBufferToImage(response.data);
            setPreviewImage(imgUrl);
        } catch (error) {
            LogError(error, 'Error fetching profile picture:');
        }
    };

    useEffect(() => {
        if (submitting) {
            ChangeProfilePicture(profilePicture).then(() => {
                setProfilePicture(null);
                setSubmitting(false);
                fetchProfilePicture();
            });
        }
    }, [submitting, profilePicture]);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div>
                <div className="profile-modal-container">
                    <span>
                        <button
                            type="button"
                            onClick={handleClose}
                            className="close-modal-button"
                        >
                            X
                        </button>
                    </span>
                    <ProfilePictureForm
                        setPreviewImage={setPreviewImage}
                        setProfilePicture={setProfilePicture}
                        setSubmitting={setSubmitting}
                    />
                    <span>
                        {previewImage != null ? (
                            <img
                                src={previewImage}
                                alt="Profile"
                                className="profile-image"
                            />
                        ) : (
                            <img
                                src={defaultProfilePicture}
                                alt="Profile"
                                className="profile-image"
                            />
                        )}
                    </span>
                </div>
            </div>
        </Modal>
    );
}

ProfilePictureModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

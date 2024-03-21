import { Modal, Button } from '@mui/material';
import { useState } from 'react';

import PropTypes from 'prop-types';
import ProfilePictureForm from '../forms/ProfilePictureForm';
import '../../styles/profilePicture.css';
import defaultProfilePicture from '../../resources/images/default-profile-picture.jpg';

export default function ProfilePictureModal({ open, handleClose }) {
    const [previewImage, setPreviewImage] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);

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

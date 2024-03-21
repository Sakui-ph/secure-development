import React, { useState, useEffect } from 'react';
import '../../styles/signup.css';

import { CreateNewUser } from '../../api/user';
import { SignUpValidation } from '../../utils/validators/SignUpValidation';
import defaultProfilePicture from '../../resources/images/default-profile-picture.jpg';
import '../../styles/profilePicture.css';
import { LogError } from '../../utils/error-handlers/error-logger';

export default function SignupForm() {
    const [initialized, setInitialized] = useState(false);
    const [inputFields, setInputFields] = useState({
        prefix_id: 101,
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        phone_number: '',
        profile_picture: '',
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    if (!initialized) {
        initCallback();
        setInitialized(true);
    }
    // set default profile picture

    function initCallback() {
        fetch(defaultProfilePicture)
            .then((response) => response.blob())
            .then((blob) => {
                const file = new File([blob], 'defaultProfilePicture.jpg', {
                    type: 'image/jpeg',
                });
                setInputFields({ ...inputFields, profile_picture: file });
            })
            .catch((error) =>
                LogError(error, 'Error setting default profile picture:'),
            );
    }

    const handleInputChange = (e) => {
        setInputFields({ ...inputFields, [e.target.name]: e.target.value });
        if (Object.keys(errors).length === 0) {
            setButtonDisabled(false);
        }
    };

    const handleProfilePictureChange = (e) => {
        setInputFields({ ...inputFields, profile_picture: e.target.files[0] });
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
    };

    const displayErrors = () => {
        setErrors(SignUpValidation(inputFields));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
            CreateNewUser(inputFields).then((result) => {
                setSubmitting(false);
            });
        }
        setSubmitting(false);
    }, [errors, submitting, inputFields]);

    return (
        <div className="form">
            <div>
                <h2>Sign up</h2>
            </div>
            {Object.keys(errors).length === 0 && submitting ? (
                <span className="success">Successfully submitted ✓</span>
            ) : null}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* <label className="label">User Type</label>
                <select value={prefixId} onChange={handlePrefixIdChange} className="input">
					<option value={101}>User</option>
                    <option value={100}>Admin</option>
                </select> */}
                <label className="label">
                    First Name
                    <input
                        className="input"
                        type="text"
                        name="first_name"
                        value={inputFields.first_name}
                        onChange={handleInputChange}
                    />
                    {errors.first_name && (
                        <p className="error">{errors.first_name}</p>
                    )}
                </label>
                <label className="label">
                    Last Name
                    <input
                        className="input"
                        type="text"
                        name="last_name"
                        value={inputFields.last_name}
                        onChange={handleInputChange}
                    />
                    {errors.last_name && (
                        <p className="error">{errors.last_name}</p>
                    )}
                </label>

                <label className="label">
                    Email
                    <input
                        className="input"
                        type="email"
                        name="email"
                        value={inputFields.email}
                        onChange={handleInputChange}
                    />
                </label>

                {errors.email && <p className="error">{errors.email}.</p>}

                <label className="label">
                    Phone Number
                    <input
                        className="input"
                        type="text"
                        name="phone_number"
                        value={inputFields.phone_number}
                        onChange={handleInputChange}
                    />
                    {errors.phone_number && (
                        <p className="error">{errors.phone_number}</p>
                    )}
                </label>

                <label className="label">
                    Password
                    <input
                        className="input"
                        type="password"
                        name="password"
                        value={inputFields.password}
                        onChange={handleInputChange}
                    />
                    {errors.password && (
                        <p className="error">{errors.password}</p>
                    )}
                </label>
                <span>
                    <label className="label">
                        Profile Picture
                        <input
                            className="input"
                            type="file"
                            name="profilePicture"
                            onChange={handleProfilePictureChange}
                        />
                    </label>
                    {errors.phone_number && (
                        <p className="error">{errors.profile_picture}</p>
                    )}
                </span>
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

                <div>
                    <button
                        className="btn"
                        type="submit"
                        disabled={buttonDisabled}
                        onClick={displayErrors}
                    >
                        Sign up
                    </button>
                </div>

                <p>
                    Already have an account? <a href="/login">Login</a>
                </p>
            </form>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import '../../styles/signup.css';
import { CreateNewUser } from '../../api/user';

export default function SignupForm() {
    const [inputFields, setInputFields] = useState({
        prefixId: 101,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const SignUpValidation = () => {
        if (!inputFields.firstName) {
            errors.firstName = 'First Name is required';
        }
        if (!inputFields.lastName) {
            errors.lastName = 'Last Name is required';
        }
        if (!inputFields.email) {
            errors.email = 'Email is required';
        }
        if (!inputFields.password) {
            errors.password = 'Password is required';
        }
        if (!inputFields.phoneNumber) {
            errors.number = 'Phone Number is required';
        }
        return errors;
    };

    const handleInputChange = (e) => {
        console.log(e.target.value);
        console.log(e.target);
        setInputFields({ ...inputFields, [e.target.name]: e.target.value });
        console.log(inputFields);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(SignUpValidation(inputFields));
        setSubmitting(true);
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
            console.log(inputFields);
            setSubmitting(false);
        }
    }, [errors, submitting]);

    return (
        <div className="form">
            <div>
                <h2>Sign up</h2>
            </div>
            {Object.keys(errors).length === 0 && submitting ? (
                <span className="success">Successfully submitted ✓</span>
            ) : null}
            <form onSubmit={handleSubmit}>
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
                        name="firstName"
                        value={inputFields.firstName}
                        onChange={handleInputChange}
                    />
                    {errors.firstName && (
                        <p className="error">
                            Please use characters and spaces only.
                        </p>
                    )}
                </label>
                <label className="label">
                    Last Name
                    <input
                        className="input"
                        type="text"
                        name="lastName"
                        value={inputFields.lastName}
                        onChange={handleInputChange}
                    />
                    {errors.lastName && (
                        <p className="error">
                            Please use characters and spaces only.
                        </p>
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

                {errors.email && (
                    <p className="error">Please enter a valid email address.</p>
                )}

                <label className="label">
                    Phone Number
                    <input
                        className="input"
                        type="text"
                        name="phoneNumber"
                        value={inputFields.phoneNumber}
                        onChange={handleInputChange}
                    />
                    {errors.phoneNumber && (
                        <p className="error">
                            Please enter a valid phone number (Philippines, no
                            dashes).
                        </p>
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
                </label>

                <button className="btn" type="submit">
                    Sign up
                </button>

                <p>
                    Already have an account? <a href="/login">Login</a>
                </p>
            </form>
        </div>
    );
}

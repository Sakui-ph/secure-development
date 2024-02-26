import React, { useState, useEffect } from 'react';
import '../../styles/signup.css';
import { CreateNewUser } from '../../api/user';

export default function SignupForm() {
    const [inputFields, setInputFields] = useState({
        prefix_id: 101,
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        phone_number: '',
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const SignUpValidation = () => {
        if (!inputFields.first_name) {
            errors.first_name = 'First Name is required';
        }
        if (!inputFields.last_name) {
            errors.last_name = 'Last Name is required';
        }
        if (!inputFields.email) {
            errors.email = 'Email is required';
        }
        if (!inputFields.password) {
            errors.password = 'Password is required';
        }
        if (!inputFields.phone_number) {
            errors.phone_number = 'Phone Number is required';
        }
        return errors;
    };

    const handleInputChange = (e) => {
        setInputFields({ ...inputFields, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(SignUpValidation(inputFields));
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
                        name="first_name"
                        value={inputFields.first_name}
                        onChange={handleInputChange}
                    />
                    {errors.first_name && (
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
                        name="last_name"
                        value={inputFields.last_name}
                        onChange={handleInputChange}
                    />
                    {errors.last_name && (
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
                        name="phone_number"
                        value={inputFields.phone_number}
                        onChange={handleInputChange}
                    />
                    {errors.phone_number && (
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

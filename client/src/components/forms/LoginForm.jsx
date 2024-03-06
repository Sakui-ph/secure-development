import React, { useState, useEffect } from 'react';
import { Login } from '../../api/user';

export default function LoginForm() {
    const [inputFields, setInputFields] = useState({
        email: '',
        password: '',
    });

    const [submitting, setSubmitting] = useState(false);

    const handleInputChange = (e) => {
        setInputFields({ ...inputFields, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
    };

    useEffect(() => {
        if (submitting) {
            Login(inputFields.email, inputFields.password).then((result) => {
                setSubmitting(false);
                window.location.href = '/home';
            });
        }
    }, [submitting, inputFields]);

    return (
        <div className="form">
            <div>
                <h2>Login</h2>
            </div>

            <form onSubmit={handleSubmit}>
                <label className="label">
                    Email
                    <input
                        onChange={handleInputChange}
                        value={inputFields.email}
                        className="input"
                        name="email"
                        type="email"
                    />
                </label>

                <label className="label">
                    Password
                    <input
                        onChange={handleInputChange}
                        value={inputFields.password}
                        className="input"
                        name="password"
                        type="password"
                    />
                </label>

                <button className="btn" type="submit">
                    Login
                </button>

                <p>
                    Don&apos;t have an account? <a href="/">Sign up</a>
                </p>
            </form>
        </div>
    );
}

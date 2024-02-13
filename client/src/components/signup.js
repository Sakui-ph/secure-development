import React, { useState } from "react";
import './signup.css';

export default function Form() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [number, setNumber] = useState("");
	const [profileImage, setProfileImage] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);

	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [phoneNumberError, setNumberError] = useState(false);

	const handleName = (e) => {
		setName(e.target.value);
		setSubmitted(false);
	};

	const handleEmail = (e) => {
		const emailValue = e.target.value;
		setEmail(emailValue);
		setSubmitted(false);

		if (!validateEmail(emailValue)) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
	};

	const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // temp regex for email validation
        return regex.test(email);
    };

	const handleNumber = (e) => {
		const numberValue = e.target.value;
		setNumber(numberValue);
		setSubmitted(false);

		if (!validateNumber(numberValue)) {
            setNumberError(true);
        } else {
            setNumberError(false);
        }
	};

	const validateNumber = (phoneNumber) => {
        const regex = /^(\+?63|0)9\d{9}$/;
        return regex.test(phoneNumber);
    };

	const handlePassword = (e) => {
		setPassword(e.target.value);
		setSubmitted(false);
	};

	const handleImageChange = (e) => {
		const imageFile = e.target.files[0];
		setProfileImage(imageFile);
		setSubmitted(false);
		
		const reader = new FileReader();
		reader.onloadend = () => {
			setImagePreview(reader.result);
		};
		if (imageFile) {
			reader.readAsDataURL(imageFile);
		} else {
			setImagePreview(null);
		}
	};	
    /*
	const removeImage = () => {
        setProfileImage(null);
        setImagePreview(null);
    };
	*/
	const handleSubmit = (e) => {
		e.preventDefault();
		if (name === "" || email === "" || password === "" || number === "" || profileImage === null) {
			setError(true);
		} else if (!validateEmail(email)) {
			setEmailError(true);
			setError(false);
		} else if (!validateNumber(number)) {
            setNumberError(true);
            setError(false);
        } else {
			setSubmitted(true);
			setError(false);
		}
	};	

	const successMessage = () => {
		return (
			<div
				className="success"
				style={{
					display: submitted ? "" : "none",
				}}
			>
				<h1>{name} successfully registered!!</h1>
			</div>
		);
	};

	const errorMessage = () => {
		return (
			<div
				className="error"
				style={{
					display: error ? "" : "none",
				}}
			>
				<h1>Please enter all the fields.</h1>
			</div>
		);
	};

	return (
		<div className="form">
			<div>
				<h2>Sign up</h2>
			</div>

			<form>
				<label className="label">Full Name</label>
				<input
					onChange={handleName}
					className="input"
					value={name}
					type="text"
				/>

				<label className="label">Email</label>
				<input
					onChange={handleEmail}
					className="input"
					value={email}
					type="email"
				/>

				{emailError && (
					<p className="error">Please enter a valid email address.</p>
				)}

				<label className="label">Phone Number</label>
				<input
					onChange={handleNumber}
					className="input"
					value={number}
					type="text"
				/>
				{phoneNumberError && (
                    <p className="error">Please enter a valid phone number (Philippines).</p>
                )}

				<label className="label">Password</label>
				<input
					onChange={handlePassword}
					className="input"
					value={password}
					type="password"
				/>

				<label className="label">Profile Photo</label>
				<input
					onChange={handleImageChange}
					className="input"
					type="file"
					accept="image/*"
				/>

				{imagePreview && (
                    <div className="image-preview-container">
                        <div className="image-preview">
                            <img src={imagePreview} alt="Preview" />
                            {/*<button onClick={removeImage} className="remove-image-btn">Remove</button>*/}
                        </div>
                    </div>
                )}

				<div className="messages">
					{errorMessage()}
					{successMessage()}
				</div>

				<button onClick={handleSubmit} className="btn" type="submit">
					Sign up
				</button>
			</form>
		</div>
	);
}
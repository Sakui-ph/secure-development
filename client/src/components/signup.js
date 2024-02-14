import React, { useState } from "react";
import './signup.css';
import { Logout } from "../api/user";

import { userEndpoints } from "../api/axios";
import { ENDPOINTS } from "../api/endpoints";

function CreateNewUser ({first_name, last_name, email, password, phone_number, profile_picture}){
    userEndpoints(ENDPOINTS.create).post({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        phone_number: phone_number,
        profile_picture: profile_picture,
    })
    .then((response) => {
        console.log("User added to SQL:", response.data);
    })
    .catch((error) => {
        console.log(error);
    });
}

export default function Form() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [number, setNumber] = useState("");
	const [profileImage, setProfileImage] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);

	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [phoneNumberError, setNumberError] = useState(false);
	const [fileTypeError, setFileTypeError] = useState(false);

	const handleFirstName = (e) => {
		setFirstName(e.target.value);
		setSubmitted(false);
	};

	const handleLastName = (e) => {
		setLastName(e.target.value);
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

	/*const handleImageChange = (e) => {
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
	};*/

	const handleImageChange = (e) => {
		const imageFile = e.target.files[0];
		setProfileImage(imageFile);
		setSubmitted(false);
		setFileTypeError(false);

		const reader = new FileReader();
		reader.onloadend = () => {
			setImagePreview(reader.result);
		};

		if (imageFile) {
			// Use the type attribute to get the MIME type
			const fileType = imageFile.type;

			if (['image/jpeg', 'image/png'].includes(fileType)) {
				reader.readAsDataURL(imageFile);
			} else {
				setFileTypeError(true);
			}
		} else {
			setImagePreview(null);
		}
	};

    /*
	const removeImage = () => {
        setProfileImage(null);
        setImagePreview(null);
    };
	
	const handleSubmit = (e) => {
		Logout(); // REMOVE LATER
		e.preventDefault();
		if (firstName === "" || lastName === "" || email === "" || password === "" || number === "" || profileImage === null) {
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
	};*/	

	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			firstName === "" ||
			lastName === "" ||
			email === "" ||
			password === "" ||
			number === "" ||
			profileImage === null
		) {
			setError(true);
		} else if (!validateEmail(email)) {
			setEmailError(true);
			setError(false);
		} else if (!validateNumber(number)) {
			setNumberError(true);
			setError(false);
		} else if (fileTypeError) {
			setError(true);
		} else {
			setSubmitted(true);
			setError(false);
			CreateNewUser({first_name: firstName, last_name: lastName, email: email, password: password, phone_number: number, profile_picture: profileImage});
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
				<h1>{firstName} {lastName} successfully registered!!</h1>
			</div>
		);
	};

	const errorMessage = () => {
		return (
			<div
				className="error"
				style={{
					display: error || fileTypeError ? "" : "none",
				}}
			>
				<h1>Please enter all the fields and make sure the file type id in JPEG or PNG.</h1>
			</div>
		);
	};

	/*const fileTypeErrorMessage = () => {
		return (
			<div
				className="error"
				style={{
					display: fileTypeError ? "" : "none",
				}}
			>
				<h1>Invalid file format. Only JPEG and PNG images are allowed.</h1>
			</div>
		);
	};*/

	return (
		<div className="form">
			<div>
				<h2>Sign up</h2>
			</div>

			<form>
				<label className="label">First Name</label>
				<input
					onChange={handleFirstName}
					className="input"
					value={firstName}
					type="text"
				/>

				<label className="label">Last Name</label>
				<input
					onChange={handleLastName}
					className="input"
					value={lastName}
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

				<p>Already have an account? <a href="/login">Login</a></p>
			</form>
		</div>
	);
}
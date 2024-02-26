import React from 'react';
import SignupForm from '../forms/SignInForm';

export default function Signup() {
    return <SignupForm />;
}

// import React, { useState } from "react";
// import '../styles/signup.css';
// import { CreateNewUser } from "../api/user";

// export default function Form() {
// 	const [prefixId, setPrefixId] = useState(101);
// 	const [firstName, setFirstName] = useState("");
// 	const [lastName, setLastName] = useState("");
// 	const [email, setEmail] = useState("");
// 	const [password, setPassword] = useState("");
// 	const [number, setNumber] = useState("");
// 	const [profileImage, setProfileImage] = useState(null);
// 	const [imagePreview, setImagePreview] = useState(null);

// 	const [submitted, setSubmitted] = useState(false);
// 	const [error, setError] = useState(false);
// 	const [firstNameError, setFirstNameError] = useState(false);
// 	const [lastNameError, setLastNameError] = useState(false);
// 	const [emailError, setEmailError] = useState(false);
// 	const [phoneNumberError, setNumberError] = useState(false);
// 	const [fileTypeError, setFileTypeError] = useState(false);

// 	const handleFirstName = (e) => {
// 		setFirstName(e.target.value);
// 		setSubmitted(false);

// 		if (!validateName(e.target.value)) {
// 			setFirstNameError(true);
// 		} else {
// 			setFirstNameError(false);
// 		}
// 	};

// 	const handleLastName = (e) => {
// 		setLastName(e.target.value);
// 		setSubmitted(false);

// 		if (!validateName(e.target.value)) {
// 			setLastNameError(true);
// 		} else {
// 			setLastNameError(false);
// 		}
// 	};

// 	const validateName = (name) => {
// 		const regex = /^[A-Za-z\s]+$/;
// 		return regex.test(name);
// 	}

// 	const handleEmail = (e) => {
// 		const emailValue = e.target.value;
// 		setEmail(emailValue);
// 		setSubmitted(false);

// 		if (!validateEmail(emailValue)) {
//             setEmailError(true);
//         } else {
//             setEmailError(false);
//         }
// 	};

// 	const validateEmail = (email) => {
//         const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return regex.test(email);
//     };

// 	const handleNumber = (e) => {
// 		const numberValue = e.target.value;
// 		setNumber(numberValue);
// 		setSubmitted(false);

// 		if (!validateNumber(numberValue)) {
//             setNumberError(true);
//         } else {
//             setNumberError(false);
//         }
// 	};

// 	const validateNumber = (phoneNumber) => {
//         const regex = /^(\+?63|0)9\d{9}$/;
//         return regex.test(phoneNumber);
//     };

// 	const handlePassword = (e) => {
// 		setPassword(e.target.value);
// 		setSubmitted(false);
// 	};

// 	const handleImageChange = (e) => {
// 		const imageFile = e.target.files[0];
// 		setProfileImage(imageFile);
// 		setSubmitted(false);
// 		setFileTypeError(false);

// 		const reader = new FileReader();
// 		reader.onloadend = () => {
// 			setImagePreview(reader.result);
// 		};

// 		if (imageFile) {
// 			// Use the type attribute to get the MIME type
// 			const fileType = imageFile.type;

// 			if (['image/jpeg', 'image/png'].includes(fileType)) {
// 				reader.readAsDataURL(imageFile);
// 			} else {
// 				setFileTypeError(true);
// 			}
// 		} else {
// 			setImagePreview(null);
// 		}
// 	};

// 	const handlePrefixIdChange = (e) => {
//         const selectedPrefixId = parseInt(e.target.value);
//     setPrefixId(selectedPrefixId);
//     };

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		if (
// 			firstName === "" ||
// 			lastName === "" ||
// 			email === "" ||
// 			password === "" ||
// 			number === "" ||
// 			profileImage === null
// 		) {
// 			setError(true);
// 		} else if (!validateEmail(email)) {
// 			setEmailError(true);
// 			setError(false);
// 		} else if (!validateNumber(number)) {
// 			setNumberError(true);
// 			setError(false);
// 		} else if (fileTypeError) {
// 			setError(true);
// 		} else {
// 			setSubmitted(true);
// 			setError(false);
// 			CreateNewUser({prefix_id: prefixId, first_name: firstName, last_name: lastName, email: email, password: password, phone_number: number, profile_picture: profileImage});
// 		}
// 	};

// 	const successMessage = () => {
// 		return (
// 			<div
// 				className="success"
// 				style={{
// 					display: submitted ? "" : "none",
// 				}}
// 			>
// 				<h1>{firstName} {lastName} successfully registered!!</h1>
// 			</div>
// 		);
// 	};

// 	const errorMessage = () => {
// 		return (
// 			<div
// 				className="error"
// 				style={{
// 					display: error || fileTypeError ? "" : "none",
// 				}}
// 			>
// 				<h1>Please enter all the fields and make sure that the file type is in JPEG or PNG.</h1>
// 			</div>
// 		);
// 	};

// 	return (
// 		<div className="form">
// 			<div>
// 				<h2>Sign up</h2>
// 			</div>

// 			<form>
// 				{/* <label className="label">User Type</label>
//                 <select value={prefixId} onChange={handlePrefixIdChange} className="input">
// 					<option value={101}>User</option>
//                     <option value={100}>Admin</option>
//                 </select> */}
// 				<label className="label">First Name</label>
// 				<input
// 					onChange={handleFirstName}
// 					className="input"
// 					value={firstName}
// 					type="text"
// 				/>
// 				{firstNameError && (
// 					<p className="error">Please use characters and spaces only.</p>
// 				)}

// 				<label className="label">Last Name</label>
// 				<input
// 					onChange={handleLastName}
// 					className="input"
// 					value={lastName}
// 					type="text"
// 				/>
// 				{lastNameError && (
// 					<p className="error">Please use characters and spaces only.</p>
// 				)}

// 				<label className="label">Email</label>
// 				<input
// 					onChange={handleEmail}
// 					className="input"
// 					value={email}
// 					type="email"
// 				/>

// 				{emailError && (
// 					<p className="error">Please enter a valid email address.</p>
// 				)}

// 				<label className="label">Phone Number</label>
// 				<input
// 					onChange={handleNumber}
// 					className="input"
// 					value={number}
// 					type="text"
// 				/>
// 				{phoneNumberError && (
//                     <p className="error">Please enter a valid phone number (Philippines, no dashes).</p>
//                 )}

// 				<label className="label">Password</label>
// 				<input
// 					onChange={handlePassword}
// 					className="input"
// 					value={password}
// 					type="password"
// 				/>

// 				<label className="label">Profile Photo</label>
// 				<input
// 					onChange={handleImageChange}
// 					className="input"
// 					type="file"
// 					accept="image/*"
// 				/>

// 				{imagePreview && (
//                     <div className="image-preview-container">
//                         <div className="image-preview">
//                             <img src={imagePreview} alt="Preview" />
//                             {/*<button onClick={removeImage} className="remove-image-btn">Remove</button>*/}
//                         </div>
//                     </div>
//                 )}

// 				<div className="messages">
// 					{errorMessage()}
// 					{successMessage()}
// 				</div>

// 				<button onClick={handleSubmit} className="btn" type="submit">
// 					Sign up
// 				</button>

// 				<p>Already have an account? <a href="/login">Login</a></p>
// 			</form>
// 		</div>
// 	);
// }

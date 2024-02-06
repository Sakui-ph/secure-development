import React from "react";
import { useState } from "react";
import './signup.css';

export default function Form() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [number, setNumber] = useState("");

	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(false);

	const handleName = (e) => {
		setName(e.target.value);
		setSubmitted(false);
	};

	const handleEmail = (e) => {
		setEmail(e.target.value);
		setSubmitted(false);
	};

	const handleNumber = (e) => {
		setNumber(e.target.value);
		setSubmitted(false);
	};

	const handlePassword = (e) => {
		setPassword(e.target.value);
		setSubmitted(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (name === "" || email === "" || password === "" || number === "") {
			setError(true);
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
				<h1>Please enter all the fields</h1>
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

				<label className="label">Phone Number</label>
				<input
					onChange={handleNumber}
					className="input"
					value={number}
					type="text"
				/>

				<label className="label">Password</label>
				<input
					onChange={handlePassword}
					className="input"
					value={password}
					type="password"
				/>

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

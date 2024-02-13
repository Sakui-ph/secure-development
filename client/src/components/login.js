import React from "react";
import { useState } from "react";
import './signup.css';
import ReadUser from "../models/readUser";
import CreateUser from "../models/createUser";

export default function Form() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(false);

	const handleEmail = (e) => {
		setEmail(e.target.value);
		setSubmitted(false);
	};

	const handlePassword = (e) => {
		setPassword(e.target.value);
		setSubmitted(false);
	};

	const handleSubmit = (e) => {
		ReadUser();
		e.preventDefault();
		if (email === "" || password === "") {
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
				<h2>Login</h2>
			</div>

			<form>
				<label className="label">Email</label>
				<input
					onChange={handleEmail}
					className="input"
					value={email}
					type="email"
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
					Login
				</button>

				<CreateUser />
				<ReadUser />

				<p>Don&apos;t have an account? <a href="/">Sign up</a></p>
			</form>
		</div>
	);
}

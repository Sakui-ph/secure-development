import React from "react";
import { useState } from "react";
import '../../styles/signup.css';
import { Login } from "../../api/user";

async function TryLogin(email, password) {
	await Login(email, password).then((result) => {
		console.log("result: fasdas", result);
		if (result) {
			console.log("Login successful");
			window.location.href = "/home";
		}
		return result;
	})
}

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
		e.preventDefault();
		if (email === "" || password === "") {
			setError(true);
		} else {
			setSubmitted(true);
			setError(false);
			TryLogin(email, password);
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

				<p>Don&apos;t have an account? <a href="/">Sign up</a></p>
			</form>
		</div>
	);
}

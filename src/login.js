import React, { Component } from "react";

import fire from "./config/Fire";

class Login extends Component {
	constructor(props) {
		super(props);
		this.login = this.login.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			email: "",
			password: ""
		};
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	login(e) {
		e.preventDefault();
		fire
			.auth()
			.signInWithEmailAndPassword(this.state.email, this.state.password)
			.then(u => {})
			.catch(error => {
				console.log(error);
			});
	}

	render() {
		return (
			<div id="loggedin-div" className="main-div">
				<h3> Firebase Login Portal </h3>

				<input
					value={this.state.email}
					onChange={this.handleChange}
					type="email"
					name="email"
					placeholder="Email..."
					id="email-field"
				/>

				<input
					value={this.state.password}
					onChange={this.handleChange}
					type="password"
					name="password"
					placeholder="Password..."
					id="password-field"
				/>
				<button onClick={this.login}>Login</button>
			</div>
		);
	}
}

export default Login;

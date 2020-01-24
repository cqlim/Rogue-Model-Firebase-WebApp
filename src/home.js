import React, { Component } from "react";
import fire from "./config/Fire";

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.logOut = this.logOut.bind(this);
	}

	logOut() {
		fire.auth().signOut();
	}

	render() {
		return (
			<div>
				<h3>You are at home.</h3>
				<button onClick={this.logOut}>Logout</button>
				<form action="/registration">
					<input type="submit" value="Registration" />
				</form>
			</div>
		);
	}
}

export default Home;

import React, { Component } from "react";
import firebase from "./config/Fire";
import "./login.css";
import Login from "./login";
import Home from "./home";

class App extends Component {
	constructor() {
		super();
		this.state = {
			user: null
		};
		this.authListener = this.authListener.bind(this);
	}

	componentDidMount() {
		this.authListener();
	}

	authListener() {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				// Login Success
				this.setState({ user });
				//				localStorage.setItem("user", user.uid);
			} else {
				// Error happened
				this.setState({ user: null });
			}
		});
	}

	render() {
		return <div className="App">{this.state.user ? <Home /> : <Login />}</div>;
	}
}

export default App;

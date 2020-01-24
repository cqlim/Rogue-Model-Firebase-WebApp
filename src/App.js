import React, { Component } from "react";
import firebase from "./config/Fire";
import { Switch, Route, Link, Redirect } from "react-router-dom";

import "./login.css";
import Login from "./login";
import Home from "./home";
import Registration from "./registration";

const ProtectedRoute = ({ component: Comp, loggedIn, path, ...rest }) => {
	return (
		<Route
			path={path}
			{...rest}
			render={props => {
				return loggedIn ? (
					<Comp {...props} />
				) : (
					<Redirect
						to={{
							pathname: "/",
							state: {
								prevLocation: path,
								error: "You need to login first!"
							}
						}}
					/>
				);
			}}
		/>
	);
};

class App extends Component {
	constructor() {
		super();
		this.state = {
			user: null,
			loggedIn: false,
			nextPath: ""
		};
		this.authListener = this.authListener.bind(this);
	}

	componentDidMount() {
		this.authListener();
	}

	authListener() {
		const { state = {} } = this.props.location;
		const { prevLocation } = state;

		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				// Login Success
				this.setState({ user, loggedIn: true }, () => {
					this.props.history.push(prevLocation || "/home");
					alert("user sucess is triggered");
				});
				//	localStorage.setItem("user", user.uid);
			} else {
				// Error happened
				this.setState({ user: null, loggedIn: false });
				alert("user failure is triggered");
			}
		});
	}

	render() {
		return (
			<Switch>
				<Route path="/" exact component={Login} />
				<ProtectedRoute
					path="/home"
					loggedIn={this.state.loggedIn}
					exact
					component={Home}
				/>
				<ProtectedRoute
					path="/register"
					loggedIn={this.state.loggedIn}
					exact
					component={Registration}
				/>
			</Switch>
		);
	}
}

export default App;

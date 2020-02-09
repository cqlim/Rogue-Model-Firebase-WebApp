import React, { Component } from "react";
import firebase from "./config/Fire";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";

import "./login.css";
import Login from "./login";
import Home from "./home";
import Registration from "./registration";
import ProjectList from "./filesTable";

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
      loggedIn: false
    };
    // this.authListener = this.authListener.bind(this);
  }

  // componentDidMount() {
  // 	this.authListener();
  // }

  // authListener() {
  // 	const { state = {} } = this.props.location;
  // 	const { prevLocation } = state;

  // 	firebase.auth().onAuthStateChanged(user => {
  // 		if (user) {
  // 			// Login Success
  // 			this.setState({ user, loggedIn: true }, () => {
  // 				// Bug is here, I may need some help with this.
  // 				this.props.history.push(prevLocation || "/home");
  // 			});
  // 			//	localStorage.setItem("user", user.uid);
  // 		} else {
  // 			// Error happened
  // 			this.setState({ user: null });
  // 		}
  // 	});
  // }

  render() {
    return (
      // <div className="App">{this.state.loggedIn ? <Home /> : <Login />}</div>
      // <BrowserRouter>
      // 	<Switch>
      // 		<Route exact path="/" component={Login} />
      // 		<Route path="/registration" component={Registration} />
      // 		<Route path="/home" component={Home} />
      // 	</Switch>
      // </BrowserRouter>
      <div className="projectList">
        <ProjectList />
      </div>
    );
  }
}

export default App;

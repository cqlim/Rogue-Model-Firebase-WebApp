import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Login from "./login";
import App from "./App";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

const routes = (
	<BrowserRouter>
		<Switch>
			<Route path="/" component={App} />
			{/* <Route exact path="/" component={Login} />
			<Route path="/registration" component={Registration} />
			<Route path="/home" component={Home} /> */}
		</Switch>
	</BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

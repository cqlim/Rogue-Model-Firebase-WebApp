import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "semantic-ui-css/semantic.min.css";
import App from "./front-end/components/App";
import * as serviceWorker from "./serviceWorker";
import { AppContainer } from "react-hot-loader";
import { BrowserRouter } from "react-router-dom";

const routes = (
	<AppContainer>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</AppContainer>
);

ReactDOM.render(routes, document.getElementById("root"));

// Hot module reloading
if (module.hot) {
	module.hot.accept("./front-end/components/App", routes);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

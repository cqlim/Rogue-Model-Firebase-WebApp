import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({
	component: Comp,
	loggedIn,
	path,
	...rest
}) => {
	return (
		<Route
			{...rest}
			render={props => {
				if (loggedIn) {
					return <Comp {...props} />;
				} else {
					return (
						<Redirect
							to={{
								pathname: "/",
								state: {
									from: props.location
								}
							}}
						/>
					);
				}
			}}
		/>
	);
};

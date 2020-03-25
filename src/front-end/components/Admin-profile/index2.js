import React, { Component, useState, useEffect } from "react";

import { Grid, Form, Header, Message, Image, Label } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import fire from "../../config/Fire";
import firestore from "../../config/firestore";
import { Link, Route, useParams } from "react-router-dom";

function onSubmit(e) {
	// var user = fire.auth().currentUser;

	// if (user.email != document.getElementById("email").value) {
	// 	document.getElementById("status").innerHTML =
	// 		"Error, email is not the same as the logged in email.";
	// 	console.log("error is here");
	// 	return;
	// }

	var auth = fire.auth();
	auth
		.sendPasswordResetEmail(document.getElementById("email").value)
		.then(function() {
			document.getElementById("status").innerHTML = "Successfully sent email";
		})
		.catch(function(error) {
			document.getElementById("status").innerHTML = "Error";
		});
}

const ProjectList = ({ history }) => {
	return (
		<Grid>
			<Helmet>
				<title>Reset Password</title>
			</Helmet>

			<Grid.Column width={6} />
			<Grid.Column width={4}>
				<Form className="adminProfile">
					><Header as="h2">Reset Password</Header>
					<Form.Input inline placeholder="email" id="email" name="email" />
					<p style={{ color: "red" }} id="status">
						Please enter your email to reset your password!
					</p>
					<Form.Button
						type="submit"
						onClick={onSubmit}
						className="projectEditConfirmButton"
					>
						Reset
					</Form.Button>
					<Link to="/">
						<Form.Button>Back</Form.Button>
					</Link>
				</Form>
			</Grid.Column>
		</Grid>
	);
};

export default ProjectList;

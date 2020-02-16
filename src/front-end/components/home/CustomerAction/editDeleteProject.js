import firebase from "../../../config/firestore";
import { Table, Input, Icon, Button } from "semantic-ui-react";
import { Route, Link, Redirect, Switch, BrowserRouter } from "react-router-dom";
import React, { Component, useState, useEffect } from "react";

export const SpellInput = ({ spell }) => {
	const [name, setName] = React.useState(spell.name);

	const onDelete = ({ history }) => {
		console.log(spell.projectID);
		firebase
			.collection("Project")
			.doc(spell.projectID)
			.delete();
		window.location.reload();
	};

	return (
		<>
			<Link
				to={"/home/" + spell.projectID + "/editProject"}
				key={spell.projectID}
			>
				<Button>Update</Button>
			</Link>
			<Button onClick={onDelete}>Delete</Button>
		</>
	);
};

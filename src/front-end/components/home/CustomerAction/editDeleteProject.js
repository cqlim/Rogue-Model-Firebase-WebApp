import firebase from "../../../config/firestore";
import { Table, Input, Icon, Button } from "semantic-ui-react";
import { Route, Link, Redirect, Switch, BrowserRouter } from "react-router-dom";
import React, { Component, useState, useEffect } from "react";

export const SpellInput = ({ spell }) => {
	const [name, setName] = React.useState(spell.name);

	const onDelete = () => {
		console.log(spell.customerID);
		firebase
			.collection("Project")
			.doc(spell.customerID)
			.delete();
	};

	return (
		<>
			<Link
				to={"/home/" + spell.customerID + "/editProject"}
				key={spell.customerID}
			>
				<Button>Update</Button>
			</Link>
			<Button onClick={onDelete}>Delete</Button>
		</>
	);
};

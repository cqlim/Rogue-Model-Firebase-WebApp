import React from "react";
import firebase from "../../../config/firestore";
import { Table, Input, Icon, Button } from "semantic-ui-react";

export const SpellInput = ({ spell }) => {
	const [name, setName] = React.useState(spell.name);

	const onDelete = () => {
		console.log(spell.customerID);
		firebase
			.collection("Project")
			.doc(spell.projectID)
			.delete();
	};

	return (
		<>
			<Button>Update</Button>
			<Button onClick={onDelete}>Delete</Button>
		</>
	);
};

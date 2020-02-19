import React, { Component } from "react";
import firestore from "../../../../config/firestore";
import { Button } from "semantic-ui-react";

function deleteFunction(documentIDs) {
	// console.log(documentIDs);
	if (documentIDs !== null && typeof documentIDs !== undefined) {
		documentIDs.map(ID => {
			firestore
				.collection("Task")
				.doc(ID)
				.delete()
				.then(function() {
					console.log("Invoice successfully deleted!");
				})
				.catch(function(error) {
					console.error("Error removing document: ", error);
				});
		});
	} else {
		console.log("there has nothing to delete.");
	}
}

const DeleteButton = props => {
	return (
		<Button onClick={() => deleteFunction(props.deletionList)}>Delete</Button>
	);
};

export default DeleteButton;

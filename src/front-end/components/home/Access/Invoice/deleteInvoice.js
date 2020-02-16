import React, { Component } from "react";
import firestore from "../../../../config/firestore";

function deleteFunction(documentIDs) {
	// console.log(documentIDs);
	if (documentIDs !== null && typeof documentIDs !== undefined) {
		documentIDs.map(ID => {
			firestore
				.collection("Invoice")
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
		<button onClick={() => deleteFunction(props.deleteList)}>Delete</button>
	);
};

export default DeleteButton;

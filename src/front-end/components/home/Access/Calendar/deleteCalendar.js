import React, { Component, useState, useEffect } from "react";
import firestore from "../../../../config/firestore";
import { Button } from "semantic-ui-react";

function handleDelete(documentIDs) {
	documentIDs.map(ID => {
		firestore
			.collection("Calender")
			.doc(ID)
			.delete()
			.then(function() {
				console.log("Document successfully deleted!");
			})
			.catch(function(error) {
				console.error("Error removing document: ", error);
			});
	});
	return documentIDs;
}
const DeleteButton = props => {
	return <Button onClick={() => handleDelete(props.deleteList)}>Delete</Button>;
};

export default DeleteButton;

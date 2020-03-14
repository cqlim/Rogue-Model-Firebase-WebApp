import React from "react";
import firestore from "../../../config/firestore";
import { Button } from "semantic-ui-react";

function handleDelet(documentIDs, collectionName) {
  documentIDs.map(ID => {
    firestore
      .collection(collectionName)
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

function confirmBox(documentIDs, collectionName) {
  if (
    documentIDs.length != 0 &&
    documentIDs != null &&
    window.confirm("Are you sure to apply deletion")
  ) {
    handleDelet(documentIDs, collectionName);
  } else {
    console.log("You cancel the deletion");
  }
}

const DeleteButton = props => {
  return (
    <Button onClick={() => confirmBox(props.deleteList, props.collectionName)}>
      Delete
    </Button>
  );
};

export default DeleteButton;

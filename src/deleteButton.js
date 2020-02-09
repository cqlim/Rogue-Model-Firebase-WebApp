import React, { Component, useState, useEffect } from "react";
import firestore from "./config/firestore";

function handleDelete(documentIDs) {
  documentIDs.map(ID => {
    firestore
      .collection("Document")
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
  return <button onClick={() => handleDelete(props.deleteList)}>Delete</button>;
};

export default DeleteButton;

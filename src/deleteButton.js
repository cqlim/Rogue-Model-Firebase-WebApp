import React, { Component, useState, useEffect } from "react";
import firestore from "./config/firestore";

function useProject(collection) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    firestore.collection(collection).onSnapshot(onSnapshot => {
      const newProject = onSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(newProject);
    });
  }, []);
  return projects;
}

function handleDelete(documentIDs) {
  documentIDs.map(ID => {
    console.log(ID);
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
}
const DeleteButton = props => {
  return <button onClick={() => handleDelete(props.deleteList)}>Delete</button>;
};

export default DeleteButton;

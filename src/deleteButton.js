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

function handleDelete(documents) {
  // let userChoice = prompt(
  //   "Please enter userID, documentID or projectID to delete file"
  // );
  // userChoice = '"' + userChoice + '"';
  // console.log(documents[2].userID === userChoice);
  // documents.map(documents => {
  //   if (
  //     documents.userID === userChoice ||
  //     documents.projectID === userChoice ||
  //     documents.documentID === userChoice
  //   ) {
  //     //   console.log("find matched document");
  //     firestore
  //       .collection("Document")
  //       .doc("hAIhXVk4tKZjw7EZQZFJ")
  //       .delete()
  //       .then(function() {
  //         console.log("Document successfly deleted!");
  //       })
  //       .catch(function(error) {
  //         console.error("Error removing document: ", error);
  //       });
  //   }
  // });
  // build a batch
  let batch = firestore.batch();
  // batch delete based on id
  documents.map(current => batch.delete(current));
  // commit the change
  return batch.commit;
}
const DeleteButton = () => {
  let documents = useProject("Document");

  return <button onClick={() => handleDelete(documents)}>Delete</button>;
};

export default DeleteButton;

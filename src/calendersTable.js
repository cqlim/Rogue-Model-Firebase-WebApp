import React, { Component, useState, useEffect } from "react";
import firestore from "./config/firestore";

function useProject() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    firestore.collection("Calender").onSnapshot(snapshot => {
      const newProject = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(newProject);
    });
  }, []);
  return projects;
}

function calendarMutation(id) {
  let userInput = getUserInput();
  if (userInput !== undefined) {
    if (userInput.length === 2) {
      firestore
        .collection("Calender")
        .doc(id)
        .update({
          calanderLink: userInput[0],
          calanderName: userInput[1]
        })
        .then(function() {
          console.log("Calendar successfully written!");
        })
        .catch(function(error) {
          console.log("Error to overwrite document: ", error);
        });
    }
  }
}

function getUserInput() {
  let changes, attributes;
  let defaultString = "calanderLink,calanderName";
  changes = prompt(
    "please enter the changes of fields and seperate then by ','",
    defaultString
  );
  if (changes && changes !== defaultString) {
    attributes = changes.split(",");
  }

  return attributes;
}
const ProjectList = props => {
  const projects = useProject();
  return (
    <div>
      {projects.map(project => (
        <div>
          <input
            type="checkbox"
            onChange={() => props.clickToDelete(project.id)}
          />
          <a key={project.id} href={project.calanderLink} data-id={project.id}>
            Calander
          </a>
          <button onClick={() => calendarMutation(project.id)}>Edit</button>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;

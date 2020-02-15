import React, { Component, useState, useEffect } from "react";
import firestore from "./config/firestore";

function useProject() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    firestore.collection("Invoice").onSnapshot(snapshot => {
      const newProject = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(newProject);
    });
  }, []);
  return projects;
}

function convertToDayTime(timeStamp) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let date = timeStamp.toDate();
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  return months[month] + " " + day + ", " + year;
}

function invoiceMutation(id) {
  let userInput = getUserInput();
  if (userInput !== undefined) {
    if (userInput.length === 4) {
      firestore
        .collection("Invoice")
        .doc(id)
        .update({
          invoiceID: userInput[0],
          invoiceLink: userInput[1],
          invoiceName: userInput[2],
          invoiceType: userInput[3]
        })
        .then(function() {
          console.log("Invoice successfully written!");
        })
        .catch(function(error) {
          console.log("Error to overwrite document: ", error);
        });
    }
  }
}

function getUserInput() {
  let changes, attributes;
  let defaultString = "invoiceID,invoiceLink,invoiceName,invoiceType";
  changes = prompt(
    "please enter the changes of fields and seperate then by ','",
    defaultString
  );

  if (changes && changes !== defaultString) {
    attributes = changes.split(",");
  }

  return attributes;
}

const InvoiceTable = props => {
  const projects = useProject();
  return (
    <div>
      <table>
        <tr>
          <th>Check</th>
          <th>Invoice NO.</th>
          <th>Title</th>
          <th>Order By</th>
          <th>Date Placed</th>
          <th>Edit Invoice</th>
        </tr>
        {projects.map(project => (
          <div key={project.id}>
            <tr>
              <td>
                <input
                  type="checkbox"
                  key={project.id}
                  onChange={() => props.clickToDelete(project.id)}
                />
              </td>
              <td key={project.id}>{project.invoiceID}</td>
              <td key={project.id}>{project.invoiceType}</td>
              <td key={project.id}>{project.invoiceName}</td>
              <td key={project.id}>
                {convertToDayTime(project.invoiceUploadDate)}
              </td>
              <td key={project.id}>
                <button onClick={() => invoiceMutation(project.id)}>
                  Edit
                </button>
              </td>
            </tr>
          </div>
        ))}
      </table>
    </div>
  );
};

export default InvoiceTable;

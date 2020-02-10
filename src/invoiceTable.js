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

const InvoiceTable = () => {
  const projects = useProject();
  return (
    <div>
      <table>
        <tr>
          <th>Invoice NO.</th>
          <th>Title</th>
          <th>Order By</th>
          <th>Date Placed</th>
        </tr>
        {projects.map(project => (
          <div>
            <tr>
              <td>{project.invoiceID}</td>
              <td>{project.invoiceType}</td>
              <td>{project.invoiceName}</td>
              <td>{convertToDayTime(project.invoiceUploadDate)}</td>
            </tr>
          </div>
        ))}
      </table>
    </div>
  );
};

export default InvoiceTable;

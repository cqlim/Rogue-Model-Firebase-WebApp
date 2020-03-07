import React, { useState, useEffect } from "react";
import firestore from "../../../../config/firestore";
import { Table, Menu, Icon, Button } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import Page from "../../../Page";
import { Route, Link, Redirect, Switch, useParams } from "react-router-dom";

function useProject(customerid) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    firestore
      .collection("Task")
      .where("userID", "==", customerid)
      .onSnapshot(snapshot => {
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

const TaskTable = props => {
  let { customerid } = useParams();
  const projects = useProject(customerid);
  return (
    <Page title="Task">
      <Helmet>
        <title>Task</title>
      </Helmet>
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Check</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Ordered By</Table.HeaderCell>
            <Table.HeaderCell>Date placed</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {projects.map(project => (
            <Table.Row key={project.id}>
              <Table.Cell>
                <input
                  type="checkbox"
                  key={project.id}
                  onChange={() => props.clickToDelete(project.id)}
                />
              </Table.Cell>
              <Table.Cell>{project.taskName}</Table.Cell>
              <Table.Cell>{project.userID}</Table.Cell>
              <Table.Cell>{convertToDayTime(project.taskDueDate)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Page>
  );
};

export default TaskTable;

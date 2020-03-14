import React, { Component, useState, useEffect } from "react";
import firestore from "../../../../config/firestore";
import { Helmet } from "react-helmet";
import { Grid, Icon, Header, Label, Table } from "semantic-ui-react";
import { Route, Link, Redirect, Switch, useParams } from "react-router-dom";
import style from "./viewCalendar.css";

function useProject(customerid) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    firestore
      .collection("Calender")
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

const CalendarList = props => {
  let { customerid } = useParams();
  let { projectid } = useParams();
  const projects = useProject(customerid);

  return (
    <div>
      <Header as="h1">Calendar</Header>
      <Helmet>
        <title>Calendar</title>
      </Helmet>

      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Select</Table.HeaderCell>
            <Table.HeaderCell>CalendarID</Table.HeaderCell>
            <Table.HeaderCell>CalendarName</Table.HeaderCell>
            <Table.HeaderCell>Check Detail</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {projects.map(project => (
            <Table.Row key={project.id}>
              <Table.Cell>
                <input
                  type="checkbox"
                  onChange={() => props.clickToDelete(project.id)}
                />
              </Table.Cell>
              <Table.Cell>{project.id}</Table.Cell>
              <Table.Cell>{project.calanderName}</Table.Cell>
              <Table.Cell>
                <a href={project.calanderLink}>
                  <Icon name="arrow right"></Icon>
                </a>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default CalendarList;

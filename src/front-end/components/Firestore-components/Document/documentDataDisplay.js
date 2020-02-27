import React, { Component, useState, useEffect } from "react";
import firestore from "../../../config/firestore";
import { Table, Menu, Icon, Button } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import Page from "../../Page";
import { Link, Route } from "react-router-dom";
import "document.css";

function useProject() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    firestore.collection("Document").onSnapshot(snapshot => {
      const newProject = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(newProject);
    });
  }, []);
  return projects;
}

const ProjectList = () => {
  const projects = useProject();
  return (
    <Page title="Document">
      <Helmet>
        <title>Document</title>
      </Helmet>
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Document ID</Table.HeaderCell>
            <Table.HeaderCell>Document Name</Table.HeaderCell>
            <Table.HeaderCell>Document Type</Table.HeaderCell>
            <Table.HeaderCell>Document Link</Table.HeaderCell>
            <Table.HeaderCell>Project ID</Table.HeaderCell>
            <Table.HeaderCell>User ID</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {projects.map(project => (
            <Table.Row key={project.documentID}>
              <Table.Cell>
                <Link to={`/home/projects${project.documentID}`}>
                  {project.documentID}
                </Link>
              </Table.Cell>
              <Table.Cell>{project.documentName}</Table.Cell>
              <Table.Cell>{project.documentType}</Table.Cell>
              <Table.Cell>{project.documentLink}</Table.Cell>
              <Table.Cell>{project.projectID}</Table.Cell>
              <Table.Cell>{project.userID}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Page>
  );
};

export default ProjectList;

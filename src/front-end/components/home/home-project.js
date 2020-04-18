import React, { Component, useState, useEffect } from "react";
import firestore from "../../config/firestore";

import { Table, Menu, Icon, Button } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import Page from "../Page";
import { Link, Route, useParams } from "react-router-dom";
import { SpellInput } from "./CustomerAction/editDeleteProject";
import projectCustomerFinders from "../../helpers/ProjectCustomerFinder";
function useProject() {
  const [projects, setProjects] = useState([]);

  let { customerid } = useParams();
  console.log(customerid);
  console.log(typeof customerid);
  let citiesRef = firestore.collection("Project");

  useEffect(() => {
    citiesRef
      .where("customerID", "==", customerid)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log("No matching documents.");
          return;
        }
        const newProject = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(newProject);
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  }, []);
  return projects;
}

const ProjectList = () => {
  const projects = useProject();

  let { customerid } = useParams();
  let useCustomerName = projectCustomerFinders.useCustomerName;
  let userName = useCustomerName(customerid);

  console.log(userName);
  let pageTitle = userName + "'s Project List";
  return (
    <Page title={pageTitle}>
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Project ID</Table.HeaderCell>
            <Table.HeaderCell>Project Name</Table.HeaderCell>
            <Table.HeaderCell>Project Address</Table.HeaderCell>
            <Table.HeaderCell>Project Type</Table.HeaderCell>
            <Table.HeaderCell>Project Description</Table.HeaderCell>
            <Table.HeaderCell>Start date</Table.HeaderCell>
            <Table.HeaderCell>Manager Name</Table.HeaderCell>
            <Table.HeaderCell>Customer ID (Who owns it)</Table.HeaderCell>
            <Table.HeaderCell> Press to access</Table.HeaderCell>
            <Table.HeaderCell> Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {projects.map((project) => (
            <Table.Row key={project.projectID}>
              <Table.Cell>{project.projectID}</Table.Cell>
              <Table.Cell>{project.projectName}</Table.Cell>
              <Table.Cell>{project.projectAddress}</Table.Cell>
              <Table.Cell>{project.projectType}</Table.Cell>
              <Table.Cell>{project.projectDescription}</Table.Cell>
              <Table.Cell>
                {project.projectStartDate.toDate().toDateString()}
              </Table.Cell>
              <Table.Cell>{project.managerName}</Table.Cell>
              <Table.Cell>{project.customerID}</Table.Cell>
              <Table.Cell>
                {
                  <Link
                    to={
                      "/home/" +
                      project.customerID +
                      "/" +
                      project.projectID +
                      "/access/document"
                    }
                    key={project.customerID}
                  >
                    <Icon name="arrow right" />
                  </Link>
                }
              </Table.Cell>
              <Table.Cell>{<SpellInput spell={project} />}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Link to={"/home/" + customerid + "/addprojects"}>
        <Button>New Projects</Button>
      </Link>
    </Page>
  );
};

export default ProjectList;

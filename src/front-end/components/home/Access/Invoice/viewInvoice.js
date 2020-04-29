import React, { Component, useState, useEffect } from "react";
import firestore from "../../../../config/firestore";
import { Table, Menu, Icon, Button, Modal, Header } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import Page from "../../../Page";
import { Route, Link, Redirect, Switch, useParams } from "react-router-dom";
import projectCustomerFinder from "../../../../helpers/ProjectCustomerFinder";
function useProject(projectid) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    firestore
      .collection("Invoice")
      .where("projectID", "==", projectid)
      .onSnapshot((snapshot) => {
        const newProject = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(newProject);
      });
  }, []);
  return projects;
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
          invoiceType: userInput[3],
        })
        .then(function () {
          console.log("Invoice successfully written!");
        })
        .catch(function (error) {
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

const InvoiceTable = (props) => {
  let { customerid } = useParams();
  let { projectid } = useParams();
  const projects = useProject(projectid);

  const useCustomerName = projectCustomerFinder.useCustomerName;
  const useProjectName = projectCustomerFinder.useProjectName;

  let customerName = useCustomerName(customerid);
  let projectName = useProjectName(projectid);
  return (
    <div>
      <Header as="h1">
        {customerName} -> {projectName} -> Invoice
      </Header>
      <Helmet>
        <title>Invoice</title>
      </Helmet>
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Check</Table.HeaderCell>
            <Table.HeaderCell>Invoice NO.</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Order By</Table.HeaderCell>
            <Table.HeaderCell>Due Date</Table.HeaderCell>
            <Table.HeaderCell>Edit Invoice</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {projects.map((project) => (
            <Table.Row key={project.id}>
              <Table.Cell>
                <input
                  type="checkbox"
                  key={project.id}
                  onChange={() => props.clickToDelete(project.id)}
                />
              </Table.Cell>
              <Table.Cell>{project.invoiceID}</Table.Cell>
              <Table.Cell>{project.invoiceName}</Table.Cell>
              <Table.Cell>{project.invoiceType}</Table.Cell>
              <Table.Cell>
                {project.invoiceDueDate.toDate().toDateString()}
              </Table.Cell>
              <Table.Cell>
                {/* <Button onClick={() => invoiceMutation(project.id)}>
                  Edit
                </Button> */}
                <Modal.Actions>
                  <Link
                    to={
                      "/home/" +
                      customerid +
                      "/" +
                      projectid +
                      "/" +
                      project.id +
                      "/editInvoice"
                    }
                  >
                    <Button>Edit</Button>
                  </Link>
                </Modal.Actions>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default InvoiceTable;

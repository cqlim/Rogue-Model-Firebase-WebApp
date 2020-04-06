import React, { useState, useEffect } from "react";
import { Button, Table, Icon } from "semantic-ui-react";
import { SpellInput } from "./CustomerAction/editDeleteCustomer";
import { Link } from "react-router-dom";
import firestore from "../../config/firestore";

function useProject(pagenumber, pageLimit) {
  const [projects, setProjects] = useState([]);
  let startIndex = (pagenumber - 1) * pageLimit + 1;
  console.log("startIndex: " + startIndex);
  useEffect(() => {
    firestore
      .collection("Customer")
      .orderBy("customerID")
      .startAt(startIndex)
      .limit(pageLimit)
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

const CustomerTableRows = props => {
  const projects = useProject(props.pagenumber, props.pageLimit);
  console.log(projects);
  return projects.map(project => (
    <Table.Row key={project.customerID}>
      <Table.Cell>{project.customerID}</Table.Cell>
      <Table.Cell>{project.customerFirstName}</Table.Cell>
      <Table.Cell>{project.customerLastName}</Table.Cell>
      <Table.Cell>{project.customerType}</Table.Cell>
      <Table.Cell>{project.customerPhoneNumber}</Table.Cell>
      <Table.Cell>{project.customerEmail}</Table.Cell>
      <Table.Cell>{project.customerAddress}</Table.Cell>
      <Table.Cell>{project.customerUsername}</Table.Cell>
      <Table.Cell>
        {
          <Link
            to={"/home/" + project.customerID + "/project"}
            key={project.customerID}
          >
            <Icon name="arrow right"></Icon>
          </Link>
        }
      </Table.Cell>
      <Table.Cell>{<SpellInput spell={project} />}</Table.Cell>
    </Table.Row>
  ));
};

export default CustomerTableRows;

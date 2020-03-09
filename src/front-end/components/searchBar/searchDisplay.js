import React from "react";
import { Table, Icon, Button } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import Page from "../Page";
import { Link } from "react-router-dom";
import { SpellInput } from "../home/CustomerAction/editDeleteCustomer";

// import times from "lodash.times";

const searchDisplay = props => {
  return (
    <Page title="Customer">
      <Helmet>
        <title>Customer</title>
      </Helmet>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell> ID</Table.HeaderCell>
            <Table.HeaderCell> First Name</Table.HeaderCell>
            <Table.HeaderCell> Last Name</Table.HeaderCell>
            <Table.HeaderCell> Type</Table.HeaderCell>
            <Table.HeaderCell> Phone</Table.HeaderCell>
            <Table.HeaderCell> Email</Table.HeaderCell>
            <Table.HeaderCell> Address</Table.HeaderCell>
            <Table.HeaderCell> UserName</Table.HeaderCell>
            <Table.HeaderCell> Projects</Table.HeaderCell>
            <Table.HeaderCell> Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.searchResult.map(project => (
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
                    <Icon name="arrow right" />
                  </Link>
                }
              </Table.Cell>
              <Table.Cell>{<SpellInput spell={project} />}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Page>
  );
};

export default searchDisplay;

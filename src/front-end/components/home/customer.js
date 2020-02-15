import React, { Component, useState, useEffect } from "react";
import firestore from "../../config/firestore";
import { Table, Menu, Icon, Button } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import Page from "../Page";
import { Route, Link, Redirect, Switch, BrowserRouter } from "react-router-dom";
import { SpellInput } from "./CustomerAction/editDeleteCustomer";

function useProject() {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		firestore.collection("Customer").onSnapshot(snapshot => {
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
		<div>
			<Page title="Customer">
				<Helmet>
					<title>Customer</title>
				</Helmet>
				<Table celled striped>
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
						{projects.map(project => (
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
				<Link to="/home/addCustomer">
					<Button>New Customer</Button>
				</Link>
			</Page>
		</div>
	);
};

export default ProjectList;

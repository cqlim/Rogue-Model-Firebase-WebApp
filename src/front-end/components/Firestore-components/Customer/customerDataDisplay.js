import React, { Component, useState, useEffect } from "react";
import firestore from "../../../config/firestore";
import { Table, Menu, Icon, Button } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import Page from "../../Page";
import { Link, Route } from "react-router-dom";
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
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{projects.map(project => (
						<Table.Row key={project.customerID}>
							<Table.Cell>
								<Link to={`/home/projects${project.customerID}`}>
									{project.customerID}
								</Link>
							</Table.Cell>
							<Table.Cell>{project.customerFirstName}</Table.Cell>
							<Table.Cell>{project.customerLastName}</Table.Cell>
							<Table.Cell>{project.customerType}</Table.Cell>
							<Table.Cell>{project.customerPhone}</Table.Cell>
							<Table.Cell>{project.customerEmail}</Table.Cell>
							<Table.Cell>{project.customerAddress}</Table.Cell>
							<Table.Cell>{project.customerUsername}</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</Page>
	);
};

export default ProjectList;

import React, { Component, useState, useEffect } from "react";
import firestore from "../../../config/firestore";
import { Table, Menu, Icon, Button } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import Page from "../../Page";
import { Link, Route } from "react-router-dom";
function useProject() {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		firestore.collection("Contractor").onSnapshot(snapshot => {
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
		<Page title="Contractor">
			<Helmet>
				<title>Contractor</title>
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
						<Table.HeaderCell> Customer ID</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{projects.map(project => (
						<Table.Row key={project.contractorID}>
							<Table.Cell>
								<Link to={`/home/projects${project.contractorID}`}>
									{project.contractorID}
								</Link>
							</Table.Cell>
							<Table.Cell>{project.contractorFirstName}</Table.Cell>
							<Table.Cell>{project.contractorLastName}</Table.Cell>
							<Table.Cell>{project.contractorType}</Table.Cell>
							<Table.Cell>{project.contractorPhone}</Table.Cell>
							<Table.Cell>{project.contractorEmail}</Table.Cell>
							<Table.Cell>{project.contractorAddress}</Table.Cell>
							<Table.Cell>{project.contractorUsername}</Table.Cell>
							<Table.Cell>{project.customerID}</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</Page>
	);
};

export default ProjectList;

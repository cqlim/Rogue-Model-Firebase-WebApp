import React, { Component, useState, useEffect } from "react";
import firestore from "../../../config/firestore";
import { Table, Menu, Icon, Button } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import Page from "../../Page";
import { Link, Route } from "react-router-dom";
function useProject() {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		firestore.collection("Manager").onSnapshot(snapshot => {
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
		<Page title="Manager">
			<Helmet>
				<title>Manager</title>
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
						<Table.Row key={project.managerID}>
							<Table.Cell>
								<Link to={`/home/projects${project.managerID}`}>
									{project.managerID}
								</Link>
							</Table.Cell>
							<Table.Cell>{project.managerFirstName}</Table.Cell>
							<Table.Cell>{project.managerLastName}</Table.Cell>
							<Table.Cell>{project.managerType}</Table.Cell>
							<Table.Cell>{project.managerPhone}</Table.Cell>
							<Table.Cell>{project.managerEmail}</Table.Cell>
							<Table.Cell>{project.managerAddress}</Table.Cell>
							<Table.Cell>{project.managerUsername}</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</Page>
	);
};

export default ProjectList;

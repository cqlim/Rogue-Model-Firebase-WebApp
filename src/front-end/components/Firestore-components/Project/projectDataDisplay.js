import React, { Component, useState, useEffect } from "react";
import firestore from "../../../config/firestore";
// import { Grid, Form, Header, Message } from "semantic-ui-react";
import times from "lodash.times";

import { Table, Menu, Icon, Button } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import Page from "../../Page";
import { Link, Route } from "react-router-dom";

function useProject() {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		firestore.collection("Project").onSnapshot(snapshot => {
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
		<Page title="Projects">
			<Helmet>
				<title>Projects</title>
			</Helmet>
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
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{projects.map(project => (
						<Table.Row key={project.projectID}>
							<Table.Cell>
								<Link to={`/home/projects${project.projectID}`}>
									{project.projectID}
								</Link>
							</Table.Cell>
							<Table.Cell>{project.projectName}</Table.Cell>
							<Table.Cell>{project.projectAddress}</Table.Cell>
							<Table.Cell>{project.projectType}</Table.Cell>
							<Table.Cell>{project.projectDescription}</Table.Cell>
							<Table.Cell>
								{project.projectStartDate.toDate().toDateString()}
							</Table.Cell>
							<Table.Cell>{project.managerID}</Table.Cell>
							<Table.Cell>{project.customerID}</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</Page>
	);
};

export default ProjectList;

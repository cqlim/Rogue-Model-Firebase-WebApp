import React, { Component, useState, useEffect } from "react";
import firestore from "../../../config/firestore";
import { Table, Menu, Icon, Button } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import Page from "../../Page";
import { Link, Route } from "react-router-dom";

function useProject() {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		firestore.collection("Invoice").onSnapshot(snapshot => {
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
		<Page title="Invoice">
			<Helmet>
				<title>Invoice</title>
			</Helmet>
			<Table celled striped>
				<Table.Header>
					<Table.Row>
						<th>Invoice ID (A-Z)</th>
						<Table.HeaderCell>Invoice Name</Table.HeaderCell>
						<Table.HeaderCell>Invoice Type</Table.HeaderCell>
						<Table.HeaderCell>Invoice Link</Table.HeaderCell>
						<Table.HeaderCell>Invoice Upload Date</Table.HeaderCell>
						<Table.HeaderCell>
							Project ID (The project is referencing)
						</Table.HeaderCell>
						<Table.HeaderCell>User ID (Who writes it)</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{projects.map(project => (
						<Table.Row key={project.invoiceID}>
							<Table.Cell>
								<Link to={`/home/projects${project.invoiceID}`}>
									{project.invoiceID}
								</Link>
							</Table.Cell>
							<Table.Cell>{project.invoiceName}</Table.Cell>
							<Table.Cell>{project.invoiceType}</Table.Cell>
							<Table.Cell>{project.invoiceLink}</Table.Cell>
							<Table.Cell>
								{project.invoiceUploadDate.toDate().toDateString()}
							</Table.Cell>
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

import React, { Component, useState, useEffect } from "react";
import firestore from "../../../config/firestore";
import { Table, Menu, Icon, Button } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import Page from "../../Page";
import { Link, Route } from "react-router-dom";

function useProject() {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		firestore.collection("Calender").onSnapshot(snapshot => {
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
		<Page title="Calendar">
			<Helmet>
				<title>Calendar</title>
			</Helmet>
			<Table celled striped>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Calender ID</Table.HeaderCell>
						<Table.HeaderCell>Calender Name</Table.HeaderCell>
						<Table.HeaderCell>Calender Link</Table.HeaderCell>
						<Table.HeaderCell>Project ID</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{projects.map(project => (
						<Table.Row key={project.calendarID}>
							<Table.Cell>
								<Link to={`/home/projects${project.calendarID}`}>
									{project.calendarID}
								</Link>
							</Table.Cell>
							<Table.Cell>{project.calendarName}</Table.Cell>
							<Table.Cell>{project.calendarLink}</Table.Cell>
							<Table.Cell>{project.projectID}</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</Page>
	);
};

export default ProjectList;

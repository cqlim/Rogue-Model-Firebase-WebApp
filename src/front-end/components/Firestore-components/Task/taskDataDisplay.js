import React, { Component, useState, useEffect } from "react";
import firestore from "../../../config/firestore";
import { Table, Menu, Icon, Button } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import Page from "../../Page";
import { Link, Route } from "react-router-dom";

function useProject() {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		firestore.collection("Task").onSnapshot(snapshot => {
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
		<Page title="Tasks">
			<Helmet>
				<title>Tasks</title>
			</Helmet>
			<Table celled striped>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Task ID</Table.HeaderCell>
						<Table.HeaderCell>Task Name</Table.HeaderCell>
						<Table.HeaderCell>Task Type</Table.HeaderCell>
						<Table.HeaderCell>Task due date</Table.HeaderCell>
						<Table.HeaderCell>Project ID</Table.HeaderCell>
						<Table.HeaderCell>User ID</Table.HeaderCell>
						<Table.HeaderCell>Task Description</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{projects.map(project => (
						<Table.Row key={project.taskID}>
							<Table.Cell>
								<Link to={`/home/projects${project.taskID}`}>
									{project.taskID}
								</Link>
							</Table.Cell>
							<Table.Cell>{project.taskName}</Table.Cell>
							<Table.Cell>{project.taskType}</Table.Cell>
							<Table.Cell>
								{project.taskDueDate.toDate().toDateString()}
							</Table.Cell>
							<Table.Cell>{project.projectID}</Table.Cell>
							<Table.Cell>{project.userID}</Table.Cell>
							<Table.Cell>{project.taskDescription}</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</Page>
	);
};

export default ProjectList;

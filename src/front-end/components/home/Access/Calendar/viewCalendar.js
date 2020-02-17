import React, { Component, useState, useEffect } from "react";
import firestore from "../../../../config/firestore";
import { Helmet } from "react-helmet";
import { Grid, Icon, Header, Modal } from "semantic-ui-react";
import { Route, Link, Redirect, Switch, useParams } from "react-router-dom";

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

const ProjectList = props => {
	let { projectid } = useParams();
	const projects = useProject();

	return (
		<div>
			<Header as="h1">Document from Project: {projectid}</Header>

			<Helmet>
				<title>Access</title>
			</Helmet>
			<Grid columns={3} divided>
				<Grid.Row>
					{projects.map(project => (
						<div>
							<input
								type="checkbox"
								onChange={() => props.clickToDelete(project.id)}
							/>
							<a
								key={project.id}
								href={project.calanderLink}
								data-id={project.id}
							>
								<Icon name="calendar alternate outline" size="massive" />
							</a>
						</div>
					))}
				</Grid.Row>
			</Grid>
		</div>
	);
};

export default ProjectList;

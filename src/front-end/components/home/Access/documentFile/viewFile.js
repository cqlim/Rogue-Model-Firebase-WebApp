import React, { Component, useState, useEffect } from "react";
import firestore from "../../../../config/firestore";
import { Helmet } from "react-helmet";
import { Grid, Icon, Header, Modal, Table } from "semantic-ui-react";
import { Route, Link, Redirect, Switch, useParams } from "react-router-dom";
import style from "./File.css";

function useProject(customerid) {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		firestore
			.collection("Document")
			.where("userID", "==", customerid)
			.onSnapshot(snapshot => {
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
	let { customerid } = useParams();
	const projects = useProject(customerid);

	return (
		<div>
			<Header as="h1">Document</Header>

			<Helmet>
				<title>Access</title>
			</Helmet>

			<Table celled striped>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Select</Table.HeaderCell>
						<Table.HeaderCell>FileID</Table.HeaderCell>
						<Table.HeaderCell>FileType</Table.HeaderCell>
						<Table.HeaderCell>FileName</Table.HeaderCell>
						<Table.HeaderCell>Check Detail</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{projects.map(project => (
						<Table.Row key={project.id}>
							<Table.Cell>
								<input
									type="checkbox"
									className="checkbox"
									onChange={() => props.clickToDelete(project.id)}
								/>
							</Table.Cell>
							<Table.Cell>{project.id}</Table.Cell>
							<Table.Cell>{project.documentType}</Table.Cell>
							<Table.Cell>{project.documentName}</Table.Cell>
							<Table.Cell>
								<a href={project.documentLink} datai-id={project.id}>
									<Icon name="arrow right"></Icon>
								</a>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</div>
	);
};

export default ProjectList;

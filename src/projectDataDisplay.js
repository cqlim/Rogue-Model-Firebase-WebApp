import React, { Component, useState, useEffect } from "react";
import firestore from "./config/firestore";

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
		<div>
			<h2>Project</h2>
			<table>
				<thead>
					<tr>
						<th>Project ID (A-Z)</th>
						<th>Name</th>
						<th>Address</th>
						<th>Project Type</th>
						<th>Start date</th>
						<th>Manager Name</th>
						<th>Owner ID</th>
					</tr>
				</thead>
				{projects.map(project => (
					<tbody>
						<tr>
							<td>{project.projectID}</td>
							<td>{project.projectName}</td>
							<td>{project.address}</td>
							<td>{project.projectType}</td>
							<td>{new Date(project.startDay).toDateString()}</td>
							<td>{project.manager}</td>
							<td>{project.userID}</td>
						</tr>
					</tbody>
				))}
			</table>
		</div>
	);
};

export default ProjectList;

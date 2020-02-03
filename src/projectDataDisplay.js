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
						<th>Project ID</th>
						<th>Project Name</th>
						<th>Project Address</th>
						<th>Project Type</th>
						<th>Project Description</th>
						<th>Start date</th>
						<th>Manager Name</th>
						<th>Customer ID (Who owns it)</th>
					</tr>
				</thead>
				{projects.map(project => (
					<tbody>
						<tr>
							<td>{project.projectID}</td>
							<td>{project.projectName}</td>
							<td>{project.projectAddress}</td>
							<td>{project.projectType}</td>
							<td>{project.projectDescription}</td>
							<td>{new Date(project.projectStartDate).toDateString()}</td>
							<td>{project.managerID}</td>
							<td>{project.customerID}</td>
						</tr>
					</tbody>
				))}
			</table>
		</div>
	);
};

export default ProjectList;

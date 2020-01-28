import React, { Component, useState, useEffect } from "react";
import firestore from "./config/firestore";

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
		<div>
			<h2>Project</h2>
			<table>
				<thead>
					<tr>
						<th>Invoice ID (A-Z)</th>
						<th>Invoice Name</th>
						<th>Invoice Type</th>
						<th>Invoice Link</th>
						<th>Invoice Upload Date</th>
						<th>Project ID (The project is referencing)</th>
						<th>User ID (Who writes it)</th>
					</tr>
				</thead>
				{projects.map(project => (
					<tbody>
						<tr>
							<td>{project.invoiceID}</td>
							<td>{project.invoiceName}</td>
							<td>{project.invoiceType}</td>
							<td>{project.invoiceLink}</td>
							<td>{new Date(project.invoiceUploadDate).toDateString()}</td>
							<td>{project.projectID}</td>
							<td>{project.userID}</td>
						</tr>
					</tbody>
				))}
			</table>
		</div>
	);
};

export default ProjectList;

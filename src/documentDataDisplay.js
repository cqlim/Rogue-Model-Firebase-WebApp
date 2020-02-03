import React, { Component, useState, useEffect } from "react";
import firestore from "./config/firestore";

function useProject() {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		firestore.collection("Document").onSnapshot(snapshot => {
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
			<h2>Document</h2>
			<table>
				<thead>
					<tr>
						<th>Document ID</th>
						<th>Document Name</th>
						<th>Document Type</th>
						<th>Document Link</th>
						<th>Project ID (The project is referencing)</th>
						<th>User ID (Who uploads it)</th>
					</tr>
				</thead>
				{projects.map(project => (
					<tbody>
						<tr>
							<td>{project.documentID}</td>
							<td>{project.documentName}</td>
							<td>{project.documentType}</td>
							<td>{project.documentLink}</td>
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

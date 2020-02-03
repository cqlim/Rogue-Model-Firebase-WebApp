import React, { Component, useState, useEffect } from "react";
import firestore from "./config/firestore";

function useProject() {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		firestore.collection("Manager").onSnapshot(snapshot => {
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
			<h2>Contractor</h2>
			<table>
				<thead>
					<tr>
						<th>Manager ID</th>
						<th>Email</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Phone Number</th>
						<th>Manager Address</th>
					</tr>
				</thead>
				{projects.map(project => (
					<tbody>
						<tr>
							<td>{project.managerID}</td>
							<td>{project.managerEmail}</td>
							<td>{project.managerFirstName}</td>
							<td>{project.managerLastName}</td>
							<td>{project.managerPhone}</td>
							<td>{project.managerAddress}</td>
						</tr>
					</tbody>
				))}
			</table>
		</div>
	);
};

export default ProjectList;

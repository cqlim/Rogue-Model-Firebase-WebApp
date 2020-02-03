import React, { Component, useState, useEffect } from "react";
import firestore from "./config/firestore";

function useProject() {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		firestore.collection("Contractor").onSnapshot(snapshot => {
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
						<th>Contractor ID</th>
						<th>Email</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Phone Number</th>
						<th>Contractor Type</th>
						<th>Contractor Username</th>
						<th>Contractor Address</th>
					</tr>
				</thead>
				{projects.map(project => (
					<tbody>
						<tr>
							<td>{project.contractorID}</td>
							<td>{project.contractorEmail}</td>
							<td>{project.contractorFirstName}</td>
							<td>{project.contractorLastName}</td>
							<td>{project.contractorPhone}</td>
							<td>{project.contractorType}</td>
							<td>{project.contractorUsername}</td>
							<td>{project.contractorAddress}</td>
						</tr>
					</tbody>
				))}
			</table>
		</div>
	);
};

export default ProjectList;

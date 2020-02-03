import React, { Component, useState, useEffect } from "react";
import firestore from "./config/firestore";

function useProject() {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		firestore.collection("Customer").onSnapshot(snapshot => {
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
			<h2>Customer</h2>
			<table>
				<thead>
					<tr>
						<th>Customer ID</th>
						<th>Email</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Phone Number</th>
						<th>Customer Type</th>
						<th>Customer Address</th>
					</tr>
				</thead>
				{projects.map(project => (
					<tbody>
						<tr>
							<td>{project.customerID}</td>
							<td>{project.customerEmail}</td>
							<td>{project.customerFirstName}</td>
							<td>{project.customerLastName}</td>
							<td>{project.customerPhone}</td>
							<td>{project.customerType}</td>
							<td>{project.customerAddress}</td>
						</tr>
					</tbody>
				))}
			</table>
		</div>
	);
};

export default ProjectList;

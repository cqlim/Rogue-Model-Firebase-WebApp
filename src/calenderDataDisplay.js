import React, { Component, useState, useEffect } from "react";
import firestore from "./config/firestore";

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

const ProjectList = () => {
	const projects = useProject();
	return (
		<div>
			<h2>Calendar</h2>
			<table>
				<thead>
					<tr>
						<th>Calendar ID</th>
						<th>Calendar Name</th>
						<th>Project ID</th>
						<th>Calendar Link</th>
					</tr>
				</thead>
				{projects.map(project => (
					<tbody>
						<tr>
							<td>{project.calendarID}</td>
							<td>{project.calendarName}</td>
							<td>{project.calendarLink}</td>
							<td>{project.projectID}</td>
						</tr>
					</tbody>
				))}
			</table>
		</div>
	);
};

export default ProjectList;

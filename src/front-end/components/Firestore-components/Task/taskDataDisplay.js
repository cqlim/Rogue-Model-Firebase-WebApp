import React, { Component, useState, useEffect } from "react";
import firestore from "./config/firestore";

function useProject() {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		firestore.collection("Task").onSnapshot(snapshot => {
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
						<th>Task ID</th>
						<th>Task Name</th>
						<th>Type Task</th>
						<th>Task due date</th>
						<th>Project ID (The task is referencing)</th>
						<th>User ID (Who writes it)</th>
						<th>Description</th>
					</tr>
				</thead>
				{projects.map(project => (
					<tbody>
						<tr>
							<td>{project.taskID}</td>
							<td>{project.taskName}</td>
							<td>{project.taskType}</td>
							<td>{new Date(project.dueDateTask).toDateString()}</td>
							<td>{project.projectID}</td>
							<td>{project.userID}</td>
							<td>{project.taskDescription}</td>
						</tr>
					</tbody>
				))}
			</table>
		</div>
	);
};

export default ProjectList;

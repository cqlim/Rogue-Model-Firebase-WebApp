import React, { Component, useState, useEffect } from "react";
import firestore from "../../../../config/firestore";

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

const ProjectList = props => {
	const projects = useProject();
	return (
		<div>
			{projects.map(project => (
				<div>
					<input
						type="checkbox"
						onChange={() => props.clickToDelete(project.id)}
					/>
					<a key={project.id} href={project.calanderLink} data-id={project.id}>
						Calander
					</a>
				</div>
			))}
		</div>
	);
};

export default ProjectList;

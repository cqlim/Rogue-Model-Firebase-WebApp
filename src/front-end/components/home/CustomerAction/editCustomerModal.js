import React, { Component, useState, useEffect } from "react";
import firestore from "../../../config/firestore";
import { Table, Menu, Modal, Button } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import Page from "../../Page";
import { Route, Link, Redirect, Switch, BrowserRouter } from "react-router-dom";
import EditCustomer from "../../Firestore-components/Customer/customerDataEdit";

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
			<Modal open dimmer="blurring">
				<Modal.Header>Edit Customer</Modal.Header>
				<Modal.Description>{<EditCustomer />}</Modal.Description>
				<Modal.Actions>
					<Link to="/home">
						<Button>Close</Button>
					</Link>
				</Modal.Actions>
			</Modal>

			{/* </Page> */}
		</div>
	);
};

export default ProjectList;

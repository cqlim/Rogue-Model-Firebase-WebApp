import React, { Component, useState, useEffect } from "react";
import firestore from "../../../config/firestore";

import { Table, Form, Grid, Button, Modal, Icon } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import Page from "../../Page";
import { Link, Route, useParams } from "react-router-dom";
import { SpellInput } from "../../home/CustomerAction/editDeleteCustomer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import style from "./projectDataEditStyle.css";

var id, dateToUpdate, id2;

function useProject() {
	const [projects, setProjects] = useState([]);
	let { projectid } = useParams();
	let { customerid } = useParams();
	id = projectid;
	id2 = customerid;
	let citiesRef = firestore.collection("Project").doc(projectid);

	var data = new Array();

	citiesRef
		.get()
		.then(doc => {
			if (!doc.exists) {
				console.log("No such document!");
			} else {
				document.getElementById("projectName").value = doc.data().projectName;
				// document.getElementById("timeDatePicture").value = doc
				// 	.data()
				// 	.projectStartDate.toDate()
				// 	.toDateString();
				document.getElementById(
					"projectDescription"
				).value = doc.data().projectDescription;
				document.getElementById(
					"projectAddress"
				).value = doc.data().projectAddress;
				document.getElementById("managerID").value = doc.data().managerID;
				document.getElementById("customerID").value = doc.data().customerID;
				if (doc.data().projectType === "active") {
					document.getElementById("projectTypeActive").checked = true;
				} else {
					document.getElementById("projectTypeActive").checked = true;
				}
			}
		})
		.catch(err => {
			console.log("Error getting document", err);
		});
}

function onSubmit(e) {
	var radioValue;
	if (document.getElementById("projectTypeActive").checked) {
		radioValue = "active";
	} else {
		radioValue = "unactive";
	}
	console.log(id);
	e.preventDefault();
	firestore
		.collection("Project")
		.doc(id)
		.update({
			// customerEmail: document.getElementById("timeDatePicture").value,
			projectAddress: document.getElementById("projectAddress").value,
			projectDescription: document.getElementById("projectDescription").value,
			managerID: document.getElementById("managerID").value,
			customerID: document.getElementById("customerID").value,
			projectName: document.getElementById("projectName").value,
			customerType: radioValue
		})
		.then(gratz => {})
		.catch(err => {
			console.log("error");
		});

	console.log("Successfully created: ");
}

const ProjectList = () => {
	const projects = useProject();

	return (
		<Modal open dimmer="blurring">
			<div style={{ float: "right" }}>
				<Link to={"/home/" + id + "/project"}>
					<Icon name="close" size="large" />
				</Link>
			</div>
			<Modal.Header>Update Project</Modal.Header>

			<Modal.Description>
				<Page title="Update Project">
					<Helmet>
						<title>Update Project</title>
					</Helmet>
					<Grid.Column width={6} />
					<Grid.Column width={4}>
						<Form>
							<Form.Input
								inline
								className="projectEditField"
								label="Project Name"
								type="projectName"
								id="projectName"
								name="projectName"
								placeholder="projectName..."
							/>
							{/* <Form.Field inline className="timepicker">
								<label>
									Project Start Date: (Note: Cannot Update)
									<DatePicker
										id="timeDatePicture"
										showTimeSelect
										timeFormat="HH:mm"
										timeIntervals={15}
										timeCaption="time"
										dateFormat="MMMM d, yyyy h:mm aa"
									/>
								</label>
							</Form.Field> */}

							<Form.Input
								inline
								className="projectEditField"
								label="Project Description"
								type="projectDescription"
								id="projectDescription"
								name="projectDescription"
								placeholder="projectDescription..."
							/>
							<Form.Input
								inline
								className="projectEditField"
								label="Project Address"
								name="projectAddress"
								id="projectAddress"
								placeholder="projectAddress..."
							/>
							<Form.Input
								inline
								className="projectEditField"
								label="Manager ID"
								name="managerID"
								id="managerID"
								placeholder="managerID..."
							/>
							<Form.Input
								inline
								className="projectEditField"
								label="Customer ID"
								name="customerID"
								id="customerID"
								placeholder="customerID..."
							/>
							<Form.Group inline>
								<label>Project Type</label>
								<Form.Radio
									label="Active"
									name="projectType"
									id="projectTypeActive"
									value="active"
								/>
								<Form.Radio
									label="Unactive"
									name="projectType"
									id="customerTypeUnactive"
									value="unactive"
								/>
							</Form.Group>
							<Form.Button
								inline
								type="submit"
								onClick={onSubmit}
								className="projectEditConfirmButton"
							>
								Update!
							</Form.Button>
						</Form>
					</Grid.Column>
				</Page>
			</Modal.Description>
			<Modal.Actions>
				<Link to={"/home/" + id2 + "/project"}>
					<Button>Close</Button>
				</Link>
			</Modal.Actions>
		</Modal>
	);
};

export default ProjectList;

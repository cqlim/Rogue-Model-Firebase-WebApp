import React, { Component, useState, useEffect } from "react";
import firestore from "../../../config/firestore";

import { Table, Form, Grid, Button, Modal } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import Page from "../../Page";
import { Link, Route, useParams } from "react-router-dom";
import { SpellInput } from "../../home/CustomerAction/editDeleteCustomer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

var id, dateToUpdate;

function useProject() {
	const [projects, setProjects] = useState([]);
	let { customerid } = useParams();
	id = customerid;

	let citiesRef = firestore.collection("Project").doc(customerid);
	var data = new Array();

	citiesRef
		.get()
		.then(doc => {
			if (!doc.exists) {
				console.log("No such document!");
			} else {
				document.getElementById("userName").value = doc.data().projectName;
				document.getElementById("email").value = doc
					.data()
					.projectStartDate.toDate()
					.toDateString();
				document.getElementById(
					"firstName"
				).value = doc.data().projectDescription;
				document.getElementById("lastName").value = doc.data().projectAddress;
				document.getElementById("phoneNumber").value = doc.data().managerID;
				document.getElementById("address").value = doc.data().customerID;
				if (doc.data().projectType === "active") {
					document.getElementById("customerTypeActive").checked = true;
				} else {
					document.getElementById("customerTypeUnactive").checked = true;
				}
			}
		})
		.catch(err => {
			console.log("Error getting document", err);
		});
}

function onSubmit(e) {
	var radioValue;
	if (document.getElementById("customerTypeActive").checked) {
		radioValue = "active";
	} else {
		radioValue = "unactive";
	}
	console.log(id);
	e.preventDefault();
	firestore
		.collection("Customer")
		.doc(id)
		.update({
			customerEmail: document.getElementById("email").value,
			customerLastName: document.getElementById("lastName").value,
			customerFirstName: document.getElementById("firstName").value,
			customerPhoneNumber: document.getElementById("phoneNumber").value,
			customerAddress: document.getElementById("address").value,
			customerUsername: document.getElementById("userName").value,
			customerType: radioValue
		});

	console.log("Successfully created: ");
}

const ProjectList = () => {
	const projects = useProject();
	console.log(dateToUpdate);

	return (
		<Modal open dimmer="blurring">
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
								label="Project Name"
								type="userName"
								id="userName"
								name="userName"
								placeholder="Username..."
							/>
							<Form.Field>
								<label>
									Project Start Date: (Note: Cannot Update)
									<DatePicker
										id="email"
										showTimeSelect
										timeFormat="HH:mm"
										timeIntervals={15}
										timeCaption="time"
										dateFormat="MMMM d, yyyy h:mm aa"
									/>
								</label>
							</Form.Field>

							<Form.Input
								inline
								label="Project Description"
								type="firstName"
								id="firstName"
								name="firstName"
								placeholder="First Name..."
							/>
							<Form.Input
								inline
								label="Project Address"
								name="lastName"
								id="lastName"
								placeholder="Last Name..."
							/>
							<Form.Input
								inline
								label="Manager ID"
								name="phoneNumber"
								id="phoneNumber"
								placeholder="e.g. 1231234599"
							/>
							<Form.Input
								inline
								label="Customer ID"
								name="address"
								id="address"
								placeholder="address..."
							/>
							<Form.Group inline>
								<label>Project Type</label>
								<Form.Radio
									label="Active"
									name="customerType"
									id="customerTypeActive"
									value="active"
								/>
								<Form.Radio
									label="Unactive"
									name="customerType"
									id="customerTypeUnactive"
									value="unactive"
								/>
							</Form.Group>
							<Form.Button type="submit" onClick={onSubmit}>
								Update!
							</Form.Button>
						</Form>
					</Grid.Column>
				</Page>
			</Modal.Description>
			<Modal.Actions>
				<Link to="/home">
					<Button>Close</Button>
				</Link>
			</Modal.Actions>
		</Modal>
	);
};

export default ProjectList;

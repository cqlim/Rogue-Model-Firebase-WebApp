import React, { Component, useState, useEffect } from "react";
import firestore from "../../../../config/firestore";
import { Table, Menu, Icon, Button } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import Page from "../../../Page";

function useProject() {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		firestore.collection("Invoice").onSnapshot(snapshot => {
			const newProject = snapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data()
			}));
			setProjects(newProject);
		});
	}, []);
	return projects;
}

function convertToDayTime(timeStamp) {
	let months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	];
	let date = timeStamp.toDate();
	let year = date.getFullYear();
	let month = date.getMonth();
	let day = date.getDate();
	return months[month] + " " + day + ", " + year;
}

function invoiceMutation(id) {
	let userInput = getUserInput();
	if (userInput !== undefined) {
		if (userInput.length === 4) {
			firestore
				.collection("Invoice")
				.doc(id)
				.update({
					invoiceID: userInput[0],
					invoiceLink: userInput[1],
					invoiceName: userInput[2],
					invoiceType: userInput[3]
				})
				.then(function() {
					console.log("Invoice successfully written!");
				})
				.catch(function(error) {
					console.log("Error to overwrite document: ", error);
				});
		}
	}
}

function getUserInput() {
	let changes, attributes;
	let defaultString = "invoiceID,invoiceLink,invoiceName,invoiceType";
	changes = prompt(
		"please enter the changes of fields and seperate then by ','",
		defaultString
	);

	if (changes && changes !== defaultString) {
		attributes = changes.split(",");
	}

	return attributes;
}

const InvoiceTable = props => {
	const projects = useProject();
	return (
		<Page title="Customer">
			<Helmet>
				<title>Customer</title>
			</Helmet>
			<Table celled striped>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Check</Table.HeaderCell>
						<Table.HeaderCell>Invoice NO.</Table.HeaderCell>
						<Table.HeaderCell>Title</Table.HeaderCell>
						<Table.HeaderCell>Order By</Table.HeaderCell>
						<Table.HeaderCell>Date Placed</Table.HeaderCell>
						<Table.HeaderCell>Edit Invoice</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{projects.map(project => (
						<Table.Row key={project.customerID}>
							<Table.Cell>
								<input
									type="checkbox"
									key={project.id}
									onChange={() => props.clickToDelete(project.id)}
								/>
							</Table.Cell>
							<Table.Cell key={project.id}>{project.invoiceID}</Table.Cell>
							<Table.Cell key={project.id}>{project.invoiceType}</Table.Cell>
							<Table.Cell key={project.id}>{project.invoiceName}</Table.Cell>
							<Table.Cell key={project.id}>
								{convertToDayTime(project.invoiceUploadDate)}
							</Table.Cell>
							<Table.Cell key={project.id}>
								<Button onClick={() => invoiceMutation(project.id)}>
									Edit
								</Button>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</Page>
	);
};

export default InvoiceTable;

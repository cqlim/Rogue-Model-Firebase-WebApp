import React, { Component } from "react";
import firstoreDB from "../../../../config/firestore";
import * as firebase from "firebase/app";
import { Button, Input, Modal } from "semantic-ui-react";
import { Route, Link, Redirect, Switch, useParams } from "react-router-dom";

class AddInvoice extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.AddtoFirestore = this.AddtoFirestore.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			invoiceID: "",
			invoiceLink: "",
			invoiceName: "",
			invoiceType: "",
			invoiceUploadDate: firebase.firestore.Timestamp.fromDate(new Date()),
			projectID: "",
			userID: ""
		};
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	AddtoFirestore() {
		console.log(this.state.invoiceLink);
		firstoreDB
			.collection("Invoice")
			.add({
				invoiceID: this.state.invoiceID,
				invoiceLink: this.state.invoiceLink,
				invoiceName: this.state.invoiceName,
				invoiceType: this.state.invoiceType,
				invoiceUploadDate: this.state.invoiceUploadDate,
				projectID: this.state.projectID,
				userID: this.state.userID
			})
			.then(function(docRef) {
				console.log("Document written with ID: ", docRef);
			})
			.catch(function(error) {
				console.error("Error add document:", error);
			});
	}

	render() {
		let lableOuput;
		if (this.state.registrationStatus == "Success") {
			lableOuput = <lable>Successfully add new file to the Drive</lable>;
		} else {
			lableOuput = <lable>{this.state.registrationStatus}</lable>;
		}
		return (
			<Modal open dimmer="blurring">
				<Modal.Header>Add Invoice</Modal.Header>
				<Modal.Description>
					<div id="InvoiceAdd-div" className="main-div">
						{/* invoiceID field */}
						<Input
							value={this.state.invoiceID}
							onChange={this.handleChange}
							type="text"
							name="invoiceID"
							placeholder="invoiceID"
							id="invoiceID-field"
						/>
						{/* invoiceLink field */}
						<Input
							value={this.state.invoiceLink}
							onChange={this.handleChange}
							type="text"
							name="invoiceLink"
							placeholder="invoiceLink"
							id="invoiceLink-field"
						/>
						{/* invoiceName field */}
						<Input
							value={this.state.invoiceName}
							onChange={this.handleChange}
							type="text"
							name="invoiceName"
							placeholder="invoiceName"
							id="invoiceName-field"
						/>
						{/* invoiceType field */}
						<Input
							value={this.state.invoiceType}
							onChange={this.handleChange}
							type="text"
							name="invoiceType"
							placeholder="invoiceType"
							id="invoiceType-field"
						/>

						{lableOuput}
						<Button onClick={this.AddtoFirestore}>Add to invoice list</Button>
					</div>
				</Modal.Description>
				<Modal.Actions>
					<Link to="/home/:customerID/:projectid/access">
						<Button>Close</Button>
					</Link>
				</Modal.Actions>
			</Modal>
		);
	}
}

export default AddInvoice;

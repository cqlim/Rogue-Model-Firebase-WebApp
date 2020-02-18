import React, { Component } from "react";
import firstoreDB from "../../../../config/firestore";
import genUID from "../../../../helpers/idGenerator";
import { Button, Input, Modal } from "semantic-ui-react";
import { Route, Link, Redirect, Switch, useParams } from "react-router-dom";

class AddFile extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.AddtoFireStore = this.AddtoFireStore.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			documentID: "",
			documentLink: "",
			documentName: "",
			documentType: "",
			projectID: "",
			userID: ""
		};
	}
	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	AddtoFireStore() {
		firstoreDB
			.collection("Document")
			.add({
				documentID: genUID(),
				documentLink: this.state.documentLink,
				documentName: this.state.documentName,
				documentType: this.state.documentType,
				projectID: this.state.projectID,
				userID: this.state.userID
			})
			.then(function(docRef) {
				console.log("Document written with ID: ", docRef);
			})
			.catch(function(error) {
				console.error("Error adding document: ", error);
			});
	}

	render() {
		let labelOutput;
		if (this.state.registrationStatus === "Success") {
			labelOutput = <label>Successfully add new file to the Drive</label>;
		} else {
			labelOutput = <label>{this.state.registrationStatus}</label>;
		}
		return (
			<Modal open dimmer="blurring">
				<Modal.Header>Add File</Modal.Header>
				<Modal.Description>
					<div id="FileAdd-div" className="main-div">
						{/* document link input */}
						<Input
							value={this.state.documentLink}
							onChange={this.handleChange}
							type="text"
							name="documentLink"
							placeholder="link to the document"
							id="documentLink-field"
						/>
						{/* document name input */}
						<Input
							value={this.state.documentName}
							onChange={this.handleChange}
							type="text"
							name="documentName"
							placeholder="name of the document"
							id="documentName-field"
						/>
						{/* document type input */}
						<Input
							value={this.state.documentType}
							onChange={this.handleChange}
							type="text"
							name="documentType"
							placeholder="type of the file"
							id="documentType-field"
						/>
						{labelOutput}
						<Button onClick={this.AddtoFireStore}>Add To File list</Button>
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

export default AddFile;

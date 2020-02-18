import React, { Component } from "react";
import firestoreDB from "../../../../config/firestore";
import * as firebase from "firebase/app";
import { Button, Input, Modal } from "semantic-ui-react";
import { Route, Link, Redirect, Switch, useParams } from "react-router-dom";

class Addtask extends Component {
	constructor(props) {
		super(props);
		this.AddtoFirestore = this.AddtoFirestore.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			projectID: "",
			taskDescription: "",
			taskDueDate: firebase.firestore.Timestamp.fromDate(new Date()),
			taskID: "",
			taskName: "",
			taskType: "",
			userID: ""
		};
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	AddtoFirestore() {
		const { history } = this.props;

		firestoreDB
			.collection("Task")
			.add({
				projectID: this.state.projectID,
				taskDescription: this.state.taskDescription,
				taskDueDate: this.state.taskDueDate,
				taskID: this.state.taskID,
				taskName: this.state.taskName,
				taskType: this.state.taskType,
				userID: this.state.userID
			})
			.then(function(docRef) {
				history.push("/home");
				console.log("Document written with ID:", docRef);
			})
			.catch(function(error) {
				console.log("Error andd document:", error);
			});
	}

	render() {
		let labelOutput;
		if (this.state.registrationStatus == "Success") {
			labelOutput = <label> Successfully add new task to the Drive</label>;
		} else {
			labelOutput = <label>{this.state.registrationStatus}</label>;
		}
		return (
			<Modal open dimmer="blurring">
				<Modal.Header>Add Customer</Modal.Header>
				<Modal.Description>
					<div id="Taskadd-div" className="main-div">
						<Input
							value={this.state.taskDescription}
							onChange={this.handleChange}
							type="text"
							name="taskDescription"
							placeholder="taskDescription"
							id="taskDescription-field"
						/>

						<Input
							value={this.state.taskName}
							onChange={this.handleChange}
							type="text"
							name="taskName"
							placeholder="taskName"
							id="taskName-field"
						/>

						<Input
							value={this.state.taskType}
							onChange={this.handleChange}
							type="text"
							name="taskType"
							placeholder="taskType"
							id="taskType-field"
						/>
						{labelOutput}
						<Button onClick={this.AddtoFirestore}>Add Task</Button>
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

export default Addtask;

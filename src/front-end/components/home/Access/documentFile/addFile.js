import React, { Component } from "react";
import firstoreDB from "../../../../config/firestore";
import { Button, Grid, Form, Modal, Message } from "semantic-ui-react";
import { Link, Route, withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import genUID from "../../../../helpers/idGenerator";
import style from "./fileAddInterface.css";

class AddFile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			documentID: "",
			documentLink: "",
			documentName: "",
			documentType: "",
			projectID: "",
			userID: "",
			customerEmail: "error",
			status: ""
		};
		this.handleChange = this.handleChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		const { history } = this.props;
		var tempCustomerID = this.props.match.params.customerid;
		var email;
		e.preventDefault();

		firstoreDB
			.collection("Document")
			.add({
				documentID: genUID(),
				documentName: this.state.documentName,
				documentLink: this.state.documentLink,
				documentType: this.state.documentType,
				projectID: this.props.match.params.projectid,
				userID: this.props.match.params.customerid
			})
			.then(function(docRef) {
				firstoreDB
					.collection("Document")
					.doc(docRef.id)
					.update({ documentID: docRef.id })
					.then(test => {
						// add customerEmail

						firstoreDB
							.collection("Customer")
							.where("customerID", "==", tempCustomerID)
							.get()
							.then(querySnapshot => {
								querySnapshot.forEach(doc => {
									// doc.data() is never undefined for query doc snapshots
									email = doc.data().customerEmail;
								});

								console.log(email);
								//Perform add
								firstoreDB
									.collection("Document")
									.doc(docRef.id)
									.update({ customerEmail: email })
									.catch(error => {
										return this.setState({ status: error });
									});
							});
					})
					.catch(error => {
						console.log(error);
						return this.setState({ status: error });
					});
			})
			.catch(function(error) {
				console.error("Error add document:", error);
			});
		history.push(
			"/home/" +
				this.props.match.params.customerid +
				"/" +
				this.props.match.params.projectid +
				"/access"
		);
		return this.setState({ status: "Document created Successfully" });
	}

	render() {
		const { error } = this.state;
		return (
			<Modal open dimmer="blurring">
				<Modal.Header>Create Document</Modal.Header>
				<Modal.Description>
					{/* <navbar /> */}
					<Grid.Column width={6} />
					<Grid.Column width={4}>
						<Form error={error} onSubmit={this.onSubmit}>
							{/* <Header as="h1">Create Task </Header> */}
							{this.state.status && (
								<Message error={error} content={this.state.status.message} />
							)}
							{this.state.status && <Message content={this.state.status} />}
							<Form.Input
								inline
								label="Document Name"
								type="documentName"
								id="documentName"
								name="documentName"
								placeholder="Document Name..."
								onChange={this.handleChange}
								className="inputfield"
							/>
							<Form.Input
								inline
								label="Document Link"
								type="documentLink"
								id="documentLink"
								name="documentLink"
								placeholder="Document Link..."
								onChange={this.handleChange}
								className="inputfield"
							/>

							<Form.Input
								inline
								label="Document Type"
								type="documentType"
								id="documentType"
								name="documentType"
								placeholder="Document Type ..."
								onChange={this.handleChange}
								className="inputfield"
							/>

							<Form.Button type="submit" className="confirmButton">
								Create!
							</Form.Button>
						</Form>
					</Grid.Column>
				</Modal.Description>
				<Modal.Actions>
					<Link
						to={
							"/home/" +
							this.props.match.params.customerid +
							"/" +
							this.props.match.params.projectid +
							"/access/document"
						}
					>
						<Button>Close</Button>
					</Link>
				</Modal.Actions>
			</Modal>
		);
	}
}

export default withRouter(AddFile);

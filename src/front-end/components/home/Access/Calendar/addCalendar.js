import React, { Component } from "react";
import firstoreDB from "../../../../config/firestore";
import { Button, Grid, Form, Modal, Message } from "semantic-ui-react";
import { Link, Route, withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import genUID from "../../../../helpers/idGenerator";

class AddCalendar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			calanderID: "",
			calanderLink: "",
			calanderName: "",
			projectID: "",
			userID: "",
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

		e.preventDefault();

		firstoreDB
			.collection("Calender")
			.add({
				calanderID: genUID(),
				calanderName: this.state.calanderName,
				calanderLink: this.state.calanderLink,
				projectID: this.props.match.params.projectid,
				userID: this.props.match.params.customerid
			})
			.then(function(docRef) {
				firstoreDB
					.collection("Calender")
					.doc(docRef.id)
					.update({ calanderID: docRef.id })
					.catch(error => {
						console.log(error);
						return this.setState({ status: error });
					});
			})
			.catch(function(error) {
				console.error("Error add Calendar:", error);
			});
		history.push(
			"/home/" +
				this.props.match.params.customerid +
				"/" +
				this.props.match.params.projectid +
				"/access"
		);
		return this.setState({ status: "Calendar created Successfully" });
	}

	render() {
		const { error } = this.state;
		return (
			<Modal open dimmer="blurring">
				<Modal.Header>Create Calendar</Modal.Header>
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
								label="Calendar Name"
								type="calanderName"
								id="calanderName"
								name="calanderName"
								placeholder="Calendar Name..."
								onChange={this.handleChange}
							/>
							<Form.Input
								inline
								label="Calendar Link"
								type="calanderLink"
								id="calanderLink"
								name="calanderLink"
								placeholder="Calendar Link..."
								onChange={this.handleChange}
							/>

							<Form.Button type="submit">Create!</Form.Button>
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
							"/access"
						}
					>
						<Button>Close</Button>
					</Link>
				</Modal.Actions>
			</Modal>
		);
	}
}

export default withRouter(AddCalendar);

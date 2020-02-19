import React, { Component } from "react";
import firstoreDB from "../../../../config/firestore";
import { Button, Grid, Form, Modal, Message } from "semantic-ui-react";
import { Link, Route, withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import genUID from "../../../../helpers/idGenerator";

class AddInvoice extends Component {
	constructor(props) {
		super(props);
		this.state = {
			invoiceID: "",
			invoiceLink: "",
			invoiceName: "",
			invoiceType: "",
			invoiceUploadDate: "",
			projectID: "",
			userID: "",
			status: ""
		};
		this.handleChange = this.handleChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.dateHandleChange = this.dateHandleChange.bind(this);
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	dateHandleChange = date => {
		// const valueOfInput = this.state.date  <--- I want string with date here
		console.log("this.state.date", this.state.invoiceUploadDate);
		this.setState({ invoiceUploadDate: date });
	};

	onSubmit(e) {
		const { history } = this.props;

		e.preventDefault();

		firstoreDB
			.collection("Invoice")
			.add({
				invoiceID: genUID(),
				invoiceLink: this.state.invoiceLink,
				invoiceName: this.state.invoiceName,
				invoiceType: this.state.invoiceType,
				invoiceUploadDate: this.state.invoiceUploadDate,
				projectID: this.props.match.params.projectid,
				userID: this.props.match.params.customerid
			})
			.then(function(docRef) {
				firstoreDB
					.collection("Invoice")
					.doc(docRef.id)
					.update({ invoiceID: docRef.id })
					.catch(error => {
						console.log(error);
						return this.setState({ status: error });
					});
			})
			.catch(function(error) {
				console.error("Error add invoice:", error);
			});
		history.push(
			"/home/" +
				this.props.match.params.customerid +
				"/" +
				this.props.match.params.projectid +
				"/access"
		);
		return this.setState({ status: "Invoice created Successfully" });
	}

	render() {
		const { error } = this.state;
		return (
			<Modal open dimmer="blurring">
				<Modal.Header>Create Invoice</Modal.Header>
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
								label="Invoice Name"
								type="invoiceName"
								id="invoiceName"
								name="invoiceName"
								placeholder="Invoice Name..."
								onChange={this.handleChange}
							/>
							<Form.Input
								inline
								label="Invoice Link"
								type="invoiceLink"
								id="invoiceLink"
								name="invoiceLink"
								placeholder="Invoice Link..."
								onChange={this.handleChange}
							/>
							<Form.Field>
								<label>
									Invoice Upload Date
									<DatePicker
										selected={this.state.invoiceUploadDate}
										onChange={this.dateHandleChange}
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
								label="Invoice Type"
								type="invoiceType"
								id="invoiceType"
								name="invoiceType"
								placeholder="Invoice Type ..."
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

export default withRouter(AddInvoice);

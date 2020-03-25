import React from "react";
import { Grid, Form, Header, Message } from "semantic-ui-react";
import fire from "../../config/Fire";
import firestoreDB from "../../config/firestore";
import genUID from "../../helpers/idGenerator";
import style from "./customerFormStyle.css";
class customerRegistration extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userID: "",
			email: "",
			password: "",
			lastName: "",
			firstName: "",
			phoneNumber: "",
			address: "",
			customerType: "",
			registrationStatus: "",
			userName: "",
			status: ""
		};

		this.handleChange = this.handleChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(e) {
		e.preventDefault();
		fire
			.auth()
			.createUserWithEmailAndPassword(this.state.email, this.state.password)
			.then(u => {
				firestoreDB
					.collection("Customer")
					.add({
						customerID: genUID(),
						customerEmail: this.state.email,
						customerLastName: this.state.lastName,
						customerFirstName: this.state.firstName,
						customerPhoneNumber: this.state.phoneNumber,
						customerAddress: this.state.address,
						customerType: this.state.customerType,
						customerUsername: this.state.userName
					})
					.then(function(docRef) {
						firestoreDB
							.collection("Customer")
							.doc(docRef.id)
							.update({ customerID: docRef.id })
							.catch(error => {
								console.log(error);
								return this.setState({ status: error });
							});
						console.log("Successfully created: ", docRef.id);
						document.getElementById("userName").value = "";
						document.getElementById("email").value = "";
						document.getElementById("password").value = "";
						document.getElementById("firstName").value = "";
						document.getElementById("lastName").value = "";
						document.getElementById("phoneNumber").value = "";
						document.getElementById("address").value = "";
						document.getElementById("customerType").checked = false;
					})
					.catch(error => {
						console.log(error);
						return this.setState({ status: error });
					});
			})
			.catch(error => {
				return this.setState({ status: error });
			});
		return this.setState({ status: "Account created Successfully" });
	}

	handleChange(e, { name, value }) {
		this.setState({ [name]: value });
	}

	render() {
		const { error } = this.state;

		return (
			<div>
				{/* <navbar /> */}
				<Grid.Column width={6} />
				<Grid.Column width={4}>
					<Form error={error} onSubmit={this.onSubmit}>
						<Header as="h2" className="createCustomerHeader">
							Create customer account
						</Header>
						{this.state.status && (
							<Message error={error} content={this.state.status.message} />
						)}
						{this.state.status && <Message content={this.state.status} />}
						<Form.Input
							className="createCustomerField"
							label="Username"
							type="userName"
							id="userName"
							name="userName"
							placeholder="Username..."
							onChange={this.handleChange}
						/>
						<Form.Input
							className="createCustomerField"
							label="Email"
							type="email"
							id="email"
							name="email"
							placeholder="Email..."
							onChange={this.handleChange}
						/>
						<Form.Input
							className="createCustomerField"
							label="Password"
							type="password"
							id="password"
							name="password"
							placeholder="password..."
							onChange={this.handleChange}
						/>
						<Form.Input
							className="createCustomerField"
							label="First Name"
							type="firstName"
							id="firstName"
							name="firstName"
							placeholder="First Name..."
							onChange={this.handleChange}
						/>
						<Form.Input
							className="createCustomerField"
							label="Last Name"
							name="lastName"
							id="lastName"
							placeholder="Last Name..."
							onChange={this.handleChange}
						/>{" "}
						<Form.Input
							className="createCustomerField"
							label="Phone Number"
							name="phoneNumber"
							id="phoneNumber"
							placeholder="e.g. 1231234599"
							onChange={this.handleChange}
						/>{" "}
						<Form.Input
							className="createCustomerField"
							label="Address"
							name="address"
							id="address"
							placeholder="address..."
							onChange={this.handleChange}
						/>{" "}
						<b>
							<label>Customer Type</label>
						</b>
						<Form.Group>
							<Form.Radio
								label="Active"
								name="customerType"
								id="customerType"
								value="active"
								checked={this.state.customerType === "active"}
								onChange={this.handleChange}
							/>
							<Form.Radio
								label="Unactive"
								name="customerType"
								id="customerType"
								value="unactive"
								checked={this.state.customerType === "unactive"}
								onChange={this.handleChange}
							/>
						</Form.Group>
						<Form.Button type="submit">Create!</Form.Button>
					</Form>
				</Grid.Column>
			</div>
		);
	}
}

export default customerRegistration;

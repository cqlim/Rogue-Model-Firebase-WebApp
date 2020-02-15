import React from "react";
import { Grid, Form, Header, Message } from "semantic-ui-react";
import firestoreDB from "../../../config/firestore";
import genUID from "../../../helpers/idGenerator";

class customerRegistration extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			projectID: "",
			projectName: "",
			projectAddress: "",
			projectType: "",
			projectStartDate: "",
			customerID: "",
			managerID: "",
			projectDescription: ""
		};

		this.handleChange = this.handleChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(e) {
		e.preventDefault();

		firestoreDB
			.collection("Project")
			.add({
				projectID: genUID(),
				projectName: this.state.projectName,
				projectAddress: this.state.projectAddress,
				projectType: this.state.projectType,
				projectStartDate: this.state.projectStartDate,
				customerID: this.state.customerID,
				managerID: this.state.managerID,
				projectDescription: this.state.projectDescription
			})
			.then(function(docRef) {
				firestoreDB
					.collection("Project")
					.doc(docRef.id)
					.update({ customerID: docRef.id })
					.catch(error => {
						console.log(error);
						return this.setState({ status: error });
					});
				// console.log("Successfully created: ", docRef.id);
				// document.getElementById("projectName").value = "";
				// document.getElementById("projectAddress").value = "";
				// document.getElementById("projectTypeUnactive").check = false;
				// document.getElementById("projectTypeActive").check = false;

				// document.getElementById("projectStartDate").value = "";
				// document.getElementById("customerID").value = "";
				// document.getElementById("managerID").value = "";
				// document.getElementById("projectDescription").value = "";
			})
			.catch(error => {
				console.log(error);
				return this.setState({ status: error });
			});

		return this.setState({ status: "Project created Successfully" });
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
						<Header as="h1">Create Project </Header>
						{this.state.status && (
							<Message error={error} content={this.state.status.message} />
						)}
						{this.state.status && <Message content={this.state.status} />}
						<Form.Input
							inline
							label="Project Name"
							type="projectName"
							id="projectName"
							name="projectName"
							placeholder="Project Name..."
							onChange={this.handleChange}
						/>
						<Form.Input
							inline
							label="Project Address"
							type="projectAddress"
							id="projectAddress"
							name="projectAddress"
							placeholder="Project Address..."
							onChange={this.handleChange}
						/>
						<Form.Input
							inline
							label="Project Description"
							type="projectDescription"
							id="projectDescription"
							name="projectDescription"
							placeholder="projectDescription"
							onChange={this.handleChange}
						/>
						<Form.Input
							inline
							label="Customer ID"
							name="customerID"
							id="customerID"
							placeholder="Customer ID ..."
							onChange={this.handleChange}
						/>{" "}
						<Form.Input
							inline
							label="Manager ID"
							name="managerID"
							id="managerID"
							placeholder="Manager ID..."
							onChange={this.handleChange}
						/>{" "}
						<Form.Group inline>
							<label>Project Type</label>
							<Form.Radio
								label="Active"
								name="projectType"
								id="projectType"
								value="active"
								checked={(this.state.projectType = "active")}
								onChange={this.handleChange}
							/>
							<Form.Radio
								label="Unactive"
								name="projectType"
								id="projectType"
								value="unactive"
								checked={(this.state.projectType = "unactive")}
								onChange={this.handleChange}
							/>
						</Form.Group>{" "}
						<Form.Button type="submit">Create!</Form.Button>
					</Form>
				</Grid.Column>
			</div>
		);
	}
}

export default customerRegistration;

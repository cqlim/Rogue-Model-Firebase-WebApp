import React, { Component } from "react";
import firestoreDB from "../../../../config/firestore";
import genUID from "../../../../helpers/idGenerator";

class AddCalander extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.AddtoFireStore = this.AddtoFireStore.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			calanderID: "",
			calanderLink: "",
			calanderName: "",
			ProjectID: ""
		};
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	AddtoFireStore() {
		firestoreDB
			.collection("Calender")
			.add({
				calanderID: genUID(),
				calanderLink: this.state.calanderLink,
				calanderName: this.state.calanderName,
				ProjectID: this.state.ProjectID
			})
			.then(function(docRef) {
				console.log("Document written with ID: ", docRef);
			})
			.catch(function(error) {
				console.log("Error adding document: ", error);
			});
	}

	render() {
		let labelOutPut;
		if (this.state.registrationStatus === "Success") {
			labelOutPut = (
				<label>Successfully andd new file to the firestoreDB</label>
			);
		} else {
			labelOutPut = <label>{this.state.registrationStatus}</label>;
		}
		return (
			<div id="CalanderAdd-div" className="main-div">
				<h>File Add</h>
				{/* calanderLink input */}
				<input
					value={this.state.calanderLink}
					onChange={this.handleChange}
					type="text"
					name="calanderLink"
					placeholder="link to the document"
					id="calanderLink-field"
				/>
				{/* calanderName input */}
				<input
					value={this.state.calanderName}
					onChange={this.handleChange}
					type="text"
					name="calanderName"
					placeholder="link to the document"
					id="calanderName-field"
				/>
				{labelOutPut}
				<button onClick={this.AddtoFireStore}>Add To file list</button>
			</div>
		);
	}
}

export default AddCalander;

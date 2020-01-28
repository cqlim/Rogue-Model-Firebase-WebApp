import React, { Component } from "react";
import fire from "./config/Fire";
import firstoreDB from "./config/firestore";
import genUID from "./util/idGenerator";

class AddFile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.signUp = this.signUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      documentId: "",
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

  signUp(e) {}

  render() {
    let labelOuput;
    if (this.state.registrationStatus === "Success") {
      labelOuput = <label>Successfully add new file to the Drive</label>;
    } else {
      labelOuput = <label>{this.state.registrationStatus}</label>;
    }
    return (
      <div>
        <h2>File Add</h2>
        {/* document link input */}
        <input
          value={this.state.documentLink}
          onChange={this.handleChange}
          type="text"
          name="Document Link"
          placeholder="link to the document"
          id="documentLink-field"
        />
        {/* document name input */}
        <input
          value={this.state.documentName}
          onChange={this.handleChange}
          type="text"
          name="Document Name"
          placeholder="name of the document"
          id="documentName-field"
        />
        {/* document type input */}
        <input
          value={this.state.documentName}
          onChange={this.handleChange}
          type="text"
          name="Document type"
          placeholder="type of the file"
          id="documentType-field"
        />
      </div>
    );
  }
}

export default AddFile;

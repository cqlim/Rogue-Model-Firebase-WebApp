import React from "react";
import { Grid, Form, Header, Message, Label } from "semantic-ui-react";
import firestoreDB from "../../../config/firestore";
import genUID from "../../../helpers/idGenerator";
import { Link, Route, withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import style from "./projectDataAddStyle.css";
class customerRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectID: "",
      projectName: "",
      projectAddress: "",
      projectType: "",
      projectStartDate: "",
      managerID: "",
      projectDescription: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.dateHandleChange = this.dateHandleChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    var tempCustomerID = this.props.match.params.customerid;
    var email;

    firestoreDB
      .collection("Project")
      .add({
        projectID: genUID(),
        projectName: this.state.projectName,
        projectAddress: this.state.projectAddress,
        projectType: this.state.projectType,
        projectStartDate: this.state.projectStartDate,
        customerID: this.props.match.params.customerid,
        managerID: this.state.managerID,
        projectDescription: this.state.projectDescription
      })
      .then(function(docRef) {
        firestoreDB
          .collection("Project")
          .doc(docRef.id)
          .update({ projectID: docRef.id })
          .then(test => {
            // add customerEmail

            firestoreDB
              .collection("Customer")
              .where("customerID", "==", tempCustomerID)
              .get()
              .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  // doc.data() is never undefined for query doc snapshots
                  email = doc.data().customerEmail;
                });

                console.log(docRef.id);
                //Perform update
                firestoreDB
                  .collection("Project")
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

  dateHandleChange = date => {
    // const valueOfInput = this.state.date  <--- I want string with date here
    console.log("this.state.date", this.state.projectStartDate);
    this.setState({ projectStartDate: date });
  };

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
              className="projectDataAddField"
              label="Project Name"
              type="projectName"
              id="projectName"
              name="projectName"
              placeholder="Project Name..."
              onChange={this.handleChange}
            />
            <Form.Input
              inline
              className="projectDataAddField"
              label="Project Address"
              type="projectAddress"
              id="projectAddress"
              name="projectAddress"
              placeholder="Project Address..."
              onChange={this.handleChange}
            />
            <Form.Field inline className="projectDataAddField">
              <label>
                Project Start Date
                <DatePicker
                  selected={this.state.projectStartDate}
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
              className="projectDataAddField"
              label="Project Description"
              type="projectDescription"
              id="projectDescription"
              name="projectDescription"
              placeholder="projectDescription"
              onChange={this.handleChange}
            />
            <Form.Input
              inline
              className="projectDataAddField"
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
                onChange={this.handleChange}
              />
              <Form.Radio
                label="Unactive"
                name="projectType"
                id="projectType"
                value="unactive"
                onChange={this.handleChange}
              />
            </Form.Group>{" "}
            <Form.Button
              type="submit"
              inline
              className="projectAddConfirmButton"
            >
              Create!
            </Form.Button>
          </Form>
        </Grid.Column>
      </div>
    );
  }
}

export default withRouter(customerRegistration);

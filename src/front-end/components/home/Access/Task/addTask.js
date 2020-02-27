import React from "react";
import { Grid, Form, Header, Message, Modal, Button } from "semantic-ui-react";
import firestoreDB from "../../../../config/firestore";
import genUID from "../../../../helpers/idGenerator";
import { Link, Route, withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskID: "",
      projectID: "",
      taskDescription: "",
      taskDueDate: "",
      taskName: "",
      taskType: "",
      userID: "",
      status: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.dateHandleChange = this.dateHandleChange.bind(this);
  }

  onSubmit(e) {
    const { history } = this.props;

    e.preventDefault();
    firestoreDB
      .collection("Task")
      .add({
        taskID: genUID(),
        // projectID: this.state.projectID,
        taskDescription: this.state.taskDescription,
        taskDueDate: this.state.taskDueDate,
        taskName: this.state.taskName,
        taskType: this.state.taskType,
        projectID: this.props.match.params.projectid,
        userID: this.props.match.params.customerid
      })
      .then(function(docRef) {
        firestoreDB
          .collection("Task")
          .doc(docRef.id)
          .update({ taskID: docRef.id })
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
    history.push(
      "/home/" +
        this.props.match.params.customerid +
        "/" +
        this.props.match.params.projectid +
        "/access"
    );
    return this.setState({ status: "Project created Successfully" });
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  dateHandleChange = date => {
    // const valueOfInput = this.state.date  <--- I want string with date here
    console.log("this.state.date", this.state.taskDueDate);
    this.setState({ taskDueDate: date });
  };

  render() {
    const { error } = this.state;
    return (
      <Modal open dimmer="blurring">
        <Modal.Header>Create Task</Modal.Header>
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
                label="Task Name"
                type="taskName"
                id="taskName"
                name="taskName"
                placeholder="Task Name..."
                onChange={this.handleChange}
                className="inputfield"
              />
              <Form.Input
                inline
                label="Task Description"
                type="taskDescription"
                id="taskDescription"
                name="taskDescription"
                placeholder="Task Description..."
                onChange={this.handleChange}
                className="inputfield"
              />
              <Form.Field className="inputfield">
                <label>
                  Project Start Date
                  <DatePicker
                    selected={this.state.taskDueDate}
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
                label="Task Type"
                type="taskType"
                id="taskType"
                name="taskType"
                placeholder="Task Type ..."
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

export default withRouter(AddTask);

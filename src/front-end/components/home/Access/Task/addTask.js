import React from "react";
import { Grid, Form, Icon, Message, Modal, Button } from "semantic-ui-react";
import firestoreDB from "../../../../config/firestore";
import genUID from "../../../../helpers/idGenerator";
import { Link, Route, withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import firebase from "firebase";

class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskID: "",
      projectID: "",
      taskDescription: "",
      taskDueDate: "",
      taskName: "",
      taskType: "ongoing", // already useless
      userID: "",
      status: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.dateHandleChange = this.dateHandleChange.bind(this);
  }
  getCurrentTime = () => {
    let timeStamp = firebase.firestore.Timestamp.fromDate(new Date());
    return timeStamp;
  };

  onSubmit(e) {
    const { history } = this.props;
    var tempCustomerID = this.props.match.params.customerid;
    var email;
    let radioValue;
    let resolvedDate;
    if (document.getElementById("projectType_ongoing").checked) {
      radioValue = "ongoing";
      resolvedDate = "";
    } else {
      radioValue = "completed";
      console.log("task completed selected");
      resolvedDate = this.getCurrentTime();
    }

    e.preventDefault();
    firestoreDB
      .collection("Task")
      .add({
        taskID: genUID(),
        // projectID: this.state.projectID,
        taskDescription: this.state.taskDescription,
        taskDueDate: this.state.taskDueDate,
        taskName: this.state.taskName,
        taskType: radioValue,
        projectID: this.props.match.params.projectid,
        userID: this.props.match.params.customerid,
        taskCreatedDate: this.getCurrentTime(),
        taskResolvedDate: resolvedDate,
      })
      .then(function (docRef) {
        firestoreDB
          .collection("Task")
          .doc(docRef.id)
          .update({ taskID: docRef.id })
          .then((test) => {
            // add customerEmail

            firestoreDB
              .collection("Customer")
              .where("customerID", "==", tempCustomerID)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  // doc.data() is never undefined for query doc snapshots
                  email = doc.data().customerEmail;
                });

                console.log(docRef.id);
                //Perform add
                firestoreDB
                  .collection("Task")
                  .doc(docRef.id)
                  .update({ customerEmail: email })
                  .catch((error) => {
                    return this.setState({ status: error });
                  });
              })
              .catch(function (error) {
                console.log("Error getting documents: ", error);
              });
          })
          .catch((error) => {
            console.log(error);
            return this.setState({ status: error });
          });
        // console.log("Successfully created: ", docRef.id);
        // document.getElementById("projectName").value = "";
        // document.getElementById("projectAddress").value = "";
        // document.getElementById("projectTypeUnactive").check = false;
        // document.getElementById("projectTypeActive").check = false;
      })
      .catch((error) => {
        console.log(error);
        return this.setState({ status: error });
      });
    history.push(
      "/home/" +
        this.props.match.params.customerid +
        "/" +
        this.props.match.params.projectid +
        "/access/task"
    );
    return this.setState({ status: "Project created Successfully" });
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  dateHandleChange = (date) => {
    // const valueOfInput = this.state.date  <--- I want string with date here
    console.log("this.state.date", this.state.taskDueDate);
    this.setState({ taskDueDate: date });
  };

  render() {
    const { error } = this.state;
    return (
      <Modal open dimmer="blurring">
        <div style={{ float: "right" }}>
          <Link
            to={
              "/home/" +
              this.props.match.params.customerid +
              "/" +
              this.props.match.params.projectid +
              "/access/task"
            }
          >
            <Icon name="close" size="large" />
          </Link>
        </div>
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
                  Task Due Date
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

              <Form.Group inline>
                <label>Task Type</label>
                <Form.Radio
                  label="Ongoing"
                  name="projectType"
                  id="projectType_ongoing"
                  value="ongoing"
                  defaultChecked
                />
                <Form.Radio
                  label="Completed"
                  name="projectType"
                  id="projectType_completed"
                  value="completed"
                />
              </Form.Group>

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
              "/access/task"
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

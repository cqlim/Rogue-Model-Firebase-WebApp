import React from "react";
import { Grid, Form, Header, Message, Label } from "semantic-ui-react";
import firestoreDB from "../../../config/firestore";
import genUID from "../../../helpers/idGenerator";
import { Link, Route, withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Geocode from "react-geocode";
import { firestore } from "firebase";

class customerRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectID: "",
      projectName: "",
      projectAddress: "",
      projectType: "", // already useless
      projectStartDate: "",
      managerID: "",
      projectDescription: "",
      projectMainContractorID: "",
      projectLatitude: 0,
      projectLongitude: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.dateHandleChange = this.dateHandleChange.bind(this);
  }

  onSubmit(e) {
    Geocode.setApiKey("AIzaSyAFex0mi6Ezx0l9IJDPcCiXTw-Xsac0xqg");
    Geocode.setLanguage("en");

    e.preventDefault();
    var tempCustomerID = this.props.match.params.customerid;
    var email;
    var managerName;
    var contractorName;
    let radioValue;

    if (document.getElementById("projectType_active").checked) {
      radioValue = "active";
    } else {
      radioValue = "unactive";
    }

    var contractorRef = firestoreDB
      .collection("Contractor")
      .doc(this.state.projectMainContractorID);

    var managerRef = firestoreDB
      .collection("Manager")
      .doc(this.state.managerID);

    Geocode.fromAddress(this.state.projectAddress).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState({ projectLatitude: lat, projectLongitude: lng });
        firestoreDB
          .collection("Project")
          .add({
            projectID: genUID(),
            projectName: this.state.projectName,
            projectAddress: this.state.projectAddress,
            projectType: radioValue,
            projectStartDate: this.state.projectStartDate,
            customerID: this.props.match.params.customerid,
            managerID: this.state.managerID,
            projectDescription: this.state.projectDescription,
            projectLatitude: this.state.projectLatitude,
            projectLongitude: this.state.projectLongitude,
            projectMainContractorID: this.state.projectMainContractorID,
            managerName: "",
            projectMainContractorName: "",
            projectCreatedDate: this.getCurrentTime(),
          })
          .then((docRef) => {
            firestoreDB
              .collection("Project")
              .doc(docRef.id)
              .update({ projectID: docRef.id })
              .then((test) => {
                // add customerEmail

                managerRef
                  .get()
                  .then((doc) => {
                    if (doc.exists) {
                      managerName =
                        doc.data().managerFirstName +
                        " " +
                        doc.data().managerLastName;

                      //perform update
                      firestoreDB
                        .collection("Project")
                        .doc(docRef.id)
                        .update({ managerName: managerName })
                        .catch((error) => {
                          return this.setState({ status: error });
                        });
                    } else {
                      // doc.data() will be undefined in this case
                      return this.setState({
                        status: "Manager document doesn't exist",
                      });
                    }
                  })
                  .catch((error) => {
                    // console.error(error);
                    return this.setState({ status: error });
                  });

                contractorRef
                  .get()
                  .then(function (doc) {
                    if (doc.exists) {
                      contractorName =
                        doc.data().contractorFirstName +
                        " " +
                        doc.data().contractorLastName;

                      //perform update
                      firestoreDB
                        .collection("Project")
                        .doc(docRef.id)
                        .update({ projectMainContractorName: contractorName })
                        .catch((error) => {
                          return this.setState({ status: error });
                        });
                    } else {
                      // doc.data() will be undefined in this case
                      return this.setState({
                        status: "Contractor document doesn't exist",
                      });
                    }
                  })
                  .catch(function (error) {
                    return this.setState({ status: error });
                  });

                firestoreDB
                  .collection("Customer")
                  .where("customerID", "==", tempCustomerID)
                  .get()
                  .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                      // doc.data() is never undefined for query doc snapshots
                      email = doc.data().customerEmail;
                    });
                    //Perform update
                    firestoreDB
                      .collection("Project")
                      .doc(docRef.id)
                      .update({ customerEmail: email })
                      .catch((error) => {
                        return this.setState({ status: error });
                      });
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

            // document.getElementById("projectStartDate").value = "";
            // document.getElementById("customerID").value = "";
            // document.getElementById("managerID").value = "";
            // document.getElementById("projectDescription").value = "";
          })
          .catch((error) => {
            console.log(error);
            return this.setState({ status: error });
          });
      },
      (error) => {
        console.error(error);
      }
    );

    return this.setState({ status: "Project created Successfully" });
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  dateHandleChange = (date) => {
    // const valueOfInput = this.state.date  <--- I want string with date here
    console.log("this.state.date", this.state.projectStartDate);
    this.setState({ projectStartDate: date });
  };

  getCurrentTime = () => {
    let date = new Date();
    return date.toUTCString();
  };
  render() {
    const { error } = this.state;
    return (
      <div style={{ marginLeft: "42%" }}>
        {/* <navbar /> */}
        <Grid.Column width={6} />
        <Grid.Column width={4}>
          <Form error={error} onSubmit={this.onSubmit}>
            <Header as="h3">Create Project </Header>
            {this.state.status && (
              <Message error={error} content={this.state.status.message} />
            )}
            {this.state.status && <Message content={this.state.status} />}
            <Form.Input
              className="projectDataAddField"
              label="Project Name"
              type="projectName"
              id="projectName"
              name="projectName"
              placeholder="Project Name..."
              onChange={this.handleChange}
            />
            <Form.Input
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
              className="projectDataAddField"
              label="Project Description"
              type="projectDescription"
              id="projectDescription"
              name="projectDescription"
              placeholder="projectDescription"
              onChange={this.handleChange}
            />
            <Form.Input
              className="projectDataAddField"
              label="Manager ID"
              name="managerID"
              id="managerID"
              placeholder="Manager ID..."
              onChange={this.handleChange}
            />{" "}
            <Form.Input
              className="projectDataAddField"
              label="Main Contractor ID"
              id="projectMainContractorID"
              name="projectMainContractorID"
              placeholder="project contractor ID "
              onChange={this.handleChange}
            />
            <Form.Group inline style={{ marginLeft: "-7%" }}>
              <label>Project Type</label>
              <Form.Radio
                label="Active"
                name="projectType"
                id="projectType_active"
                value="active"
              />
              <Form.Radio
                label="Unactive"
                name="projectType"
                id="projectType_unactive"
                value="unactive"
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

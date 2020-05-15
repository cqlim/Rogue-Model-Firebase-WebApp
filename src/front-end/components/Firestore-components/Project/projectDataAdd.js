import React from "react";
import { Grid, Form, Header, Message, Label } from "semantic-ui-react";
import firestoreDB from "../../../config/firestore";
import genUID from "../../../helpers/idGenerator";
import { Link, Route, withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Geocode from "react-geocode";
import Select from "react-select";
import firebase from "firebase";

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
      options: [],
      options2: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.dateHandleChange = this.dateHandleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSelectChange2 = this.handleSelectChange2.bind(this);
  }

  async componentDidMount() {
    let x = [];
    await firestoreDB
      .collection("Contractor")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          var name =
            doc.data().contractorFirstName +
            " " +
            doc.data().contractorLastName;

          x.push({
            value: doc.id,
            label: name,
          });
        });
      });
    this.setState({ options: x });

    let y = [];
    await firestoreDB
      .collection("Manager")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.data());
          var name =
            doc.data().managerFirstName + " " + doc.data().managerLastName;
          y.push({
            value: doc.data().managerID,
            label: name,
          });
        });
      });
    this.setState({ options2: y });
    console.log("th " + this.state.options2[0].label);
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

    radioValue = document.querySelector('input[name="projectType"]:checked')
      .value;
    console.log("ebay " + this.state.projectMainContractorID);

    var contractorRef = firestoreDB
      .collection("Contractor")
      .doc(this.state.projectMainContractorID);

    console.log("ebay 2" + this.state.managerID);

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
  handleSelectChange(e) {
    this.setState({ projectMainContractorID: e.value });
  }

  handleSelectChange2(e) {
    this.setState({ managerID: e.value });
  }

  dateHandleChange = (date) => {
    // const valueOfInput = this.state.date  <--- I want string with date here
    this.setState({ projectStartDate: date });
  };

  getCurrentTime = () => {
    let timeStamp = firebase.firestore.Timestamp.fromDate(new Date());
    return timeStamp;
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
            {/* <Form.Input
							className="projectDataAddField"
							label="Manager ID"
							name="managerID"
							id="managerID"
							placeholder="Manager ID..."
							onChange={this.handleChange}
						/>{" "} */}
            <label>
              <b>Manger ID</b>
            </label>
            <Select
              name="managerID"
              className="projectDataAddField"
              placeholder={this.state.managerID}
              isSearchable
              classNamePrefix="react-select"
              value={this.state.managerID}
              onChange={(e) => {
                this.handleSelectChange2(e);
              }}
              options={this.state.options2}
            />
            {/* <Form.Input
							className="projectDataAddField"
							label="Main Contractor ID"
							id="projectMainContractorID"
							name="projectMainContractorID"
							placeholder="project contractor ID "
							onChange={this.handleChange}
						/> */}
            <label>
              <b>Contractor ID</b>
            </label>
            <Select
              name="projectMainContractorID"
              placeholder={this.state.projectMainContractorID}
              className="projectDataAddField"
              isSearchable
              classNamePrefix="react-select"
              value={this.state.projectMainContractorID}
              onChange={(e) => {
                this.handleSelectChange(e);
              }}
              options={this.state.options}
            />
            <Form.Group inline style={{ marginLeft: "-7%" }}>
              <label>Project Type</label>
              <Form.Radio
                defaultChecked
                label="New"
                name="projectType"
                id="projectType_new"
                value="new"
              />
              <Form.Radio
                label="Started"
                name="projectType"
                id="projectType_started"
                value="started"
              />
              <Form.Radio
                label="Completed"
                name="projectType"
                id="projectType_completed"
                value="completed"
              />
              <Form.Radio
                label="Closed"
                name="projectType"
                id="projectType_closed"
                value="closed"
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

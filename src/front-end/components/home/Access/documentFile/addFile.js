import React, { Component } from "react";
import firstoreDB from "../../../../config/firestore";
import { Button, Grid, Form, Modal, Message, Icon } from "semantic-ui-react";
import { Link, Route, withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import genUID from "../../../../helpers/idGenerator";
import style from "./fileAddInterface.css";

class AddFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documentID: "",
      documentLink: "",
      documentName: "",
      documentType: "", //already useless
      projectID: "",
      userID: "",
      customerEmail: "error",
      status: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  getCurrentTime() {
    let date = new Date();
    return date.toUTCString();
  }

  getDocumentType() {
    let documentTypes = document.getElementsByName("documentType");
    let selectedType;

    for (let i = 0; i < documentTypes.length; i++) {
      if (documentTypes[i].checked) {
        selectedType = documentTypes[i].value;
      }
    }
    return selectedType;
  }

  onSubmit(e) {
    const { history } = this.props;
    var tempCustomerID = this.props.match.params.customerid;
    var email;
    var selectedType = this.getDocumentType();
    e.preventDefault();

    firstoreDB
      .collection("Document")
      .add({
        documentID: genUID(),
        documentName: this.state.documentName,
        documentLink: this.state.documentLink,
        documentType: selectedType,
        projectID: this.props.match.params.projectid,
        userID: this.props.match.params.customerid,
        documentCreatedTime: this.getCurrentTime(),
      })
      .then(function (docRef) {
        firstoreDB
          .collection("Document")
          .doc(docRef.id)
          .update({ documentID: docRef.id })
          .then((test) => {
            // add customerEmail

            firstoreDB
              .collection("Customer")
              .where("customerID", "==", tempCustomerID)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  // doc.data() is never undefined for query doc snapshots
                  email = doc.data().customerEmail;
                });

                console.log(email);
                //Perform add
                firstoreDB
                  .collection("Document")
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
      })
      .catch(function (error) {
        console.error("Error add document:", error);
      });
    history.push(
      "/home/" +
        this.props.match.params.customerid +
        "/" +
        this.props.match.params.projectid +
        "/access/document"
    );
    return this.setState({ status: "Document created Successfully" });
  }

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
              "/access/document"
            }
          >
            <Icon name="close" size="large" />
          </Link>
        </div>
        <Modal.Header>Create Document</Modal.Header>
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
                label="Document Name"
                type="documentName"
                id="documentName"
                name="documentName"
                placeholder="Document Name..."
                onChange={this.handleChange}
                className="inputfield"
              />
              <Form.Input
                inline
                label="Document Link"
                type="documentLink"
                id="documentLink"
                name="documentLink"
                placeholder="Document Link..."
                onChange={this.handleChange}
                className="inputfield"
              />

              {/* <Form.Input
                inline
                label="Document Type"
                type="documentType"
                id="documentType"
                name="documentType"
                placeholder="Document Type ..."
                onChange={this.handleChange}
                className="inputfield"
              /> */}

              <Form.Group inline>
                <label>Document Type</label>
                <Form.Radio
                  label="doc"
                  name="documentType"
                  id="documentType_doc"
                  value="doc"
                  defaultChecked
                />

                <Form.Radio
                  label="excel"
                  name="documentType"
                  id="documentType_excel"
                  value="excel"
                />

                <Form.Radio
                  label="ppt"
                  name="documentType"
                  id="documentType_ppt"
                  value="ppt"
                />

                <Form.Radio
                  label="pdf"
                  name="documentType"
                  id="documentType_pdf"
                  value="pdf"
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
              "/access/document"
            }
          >
            <Button>Close</Button>
          </Link>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default withRouter(AddFile);

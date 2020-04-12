import React, { Component } from "react";
import firstoreDB from "../../../../config/firestore";
import firebase from "../../../../config/Fire";
import { Button, Grid, Form, Modal, Message, Icon } from "semantic-ui-react";
import { Link, Route, withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import genUID from "../../../../helpers/idGenerator";

class AddInvoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoiceID: "",
      invoiceLink: "",
      invoiceName: "",
      invoiceType: "", // already useless
      invoiceDueDate: "",
      projectID: "",
      userID: "",
      status: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.dateHandleChange = this.dateHandleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  dateHandleChange = (date) => {
    // const valueOfInput = this.state.date  <--- I want string with date here
    console.log("this.state.date", this.state.invoiceDueDate);
    this.setState({ invoiceDueDate: date });
  };

  getCurrentTime = () => {
    let date = new Date();
    return date.toUTCString();
  };

  onSubmit(e) {
    e.preventDefault();

    const { history } = this.props;
    var tempCustomerID = this.props.match.params.customerid;
    var email;

    let radioValue;
    if (document.getElementById("invoiceType_paid").checked) {
      radioValue = "paid";
    } else {
      radioValue = "unpaid";
    }

    firstoreDB
      .collection("Invoice")
      .add({
        invoiceID: genUID(),
        invoiceLink: this.state.invoiceLink,
        invoiceName: this.state.invoiceName,
        invoiceType: radioValue,
        invoiceDueDate: this.state.invoiceDueDate,
        projectID: this.props.match.params.projectid,
        userID: this.props.match.params.customerid,
        invoiceCreatedDate: this.getCurrentTime(),
      })
      .then(function (docRef) {
        firstoreDB
          .collection("Invoice")
          .doc(docRef.id)
          .update({ invoiceID: docRef.id })
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

                console.log(docRef.id);
                //Perform update
                firstoreDB
                  .collection("Invoice")
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
        console.error("Error add invoice:", error);
      });
    history.push(
      "/home/" +
        this.props.match.params.customerid +
        "/" +
        this.props.match.params.projectid +
        "/access/invoice"
    );
    return this.setState({ status: "Invoice created Successfully" });
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
              "/access/invoice"
            }
          >
            <Icon name="close" size="large" />
          </Link>
        </div>
        <Modal.Header>Create Invoice</Modal.Header>
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
                label="Invoice Name"
                type="invoiceName"
                id="invoiceName"
                name="invoiceName"
                placeholder="Invoice Name..."
                onChange={this.handleChange}
                className="inputfield"
              />
              <Form.Input
                inline
                label="Invoice Link"
                type="invoiceLink"
                id="invoiceLink"
                name="invoiceLink"
                placeholder="Invoice Link..."
                onChange={this.handleChange}
                className="inputfield"
              />
              <Form.Field className="inputfield">
                <label>
                  Invoice Due Date
                  <DatePicker
                    selected={this.state.invoiceDueDate}
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
                <label>Invoice Type</label>
                <Form.Radio
                  label="paid"
                  name="invoiceType"
                  id="invoiceType_paid"
                  value="paid"
                />
                <Form.Radio
                  label="unpaid"
                  name="invoiceType"
                  id="invoiceType_unpaid"
                  value="unpaid"
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
              "/access/invoice"
            }
          >
            <Button>Close</Button>
          </Link>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default withRouter(AddInvoice);

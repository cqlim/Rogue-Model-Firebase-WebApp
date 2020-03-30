import React, { Component, useState, useEffect } from "react";
import firestore from "../../../config/firestore";

import { Table, Form, Grid, Button, Modal, Icon } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import Page from "../../Page";
import { Link, Route, useParams } from "react-router-dom";
import { SpellInput } from "../../home/CustomerAction/editDeleteCustomer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import style from "./projectDataEditStyle.css";

var id, dateToUpdate, projectID;
function useProject() {
  const [projects, setProjects] = useState([]);
  let { projectid } = useParams();
  let { customerid } = useParams();
  id = customerid;
  projectID = projectid;

  let citiesRef = firestore.collection("Project").doc(projectid);
  var data = new Array();

  citiesRef
    .get()
    .then(doc => {
      if (!doc.exists) {
        console.log("No such document!");
      } else {
        document.getElementById("projectName").value = doc.data().projectName;
        // document.getElementById("timeDatePicture").value = doc
        // 	.data()
        // 	.projectStartDate.toDate()
        // 	.toDateString();
        document.getElementById(
          "projectDescription"
        ).value = doc.data().projectDescription;

        document.getElementById(
          "projectAddress"
        ).value = doc.data().projectAddress;

        if (doc.data().projectType === "active") {
          document.getElementById("customerTypeActive").checked = true;
        } else {
          document.getElementById("customerTypeUnactive").checked = true;
        }
      }
    })
    .catch(err => {
      console.log("Error getting document", err);
    });
}

function onSubmit(e) {
  var radioValue;
  if (document.getElementById("customerTypeActive").checked) {
    radioValue = "active";
  } else {
    radioValue = "unactive";
  }
  console.log(id);
  e.preventDefault();
  firestore
    .collection("Project")
    .doc(projectID)
    .update({
      // customerEmail: document.getElementById("timeDatePicture").value,
      projectName: document.getElementById("projectName").value,
      projectDescription: document.getElementById("projectDescription").value,
      projectAddress: document.getElementById("projectAddress").value,
      customerType: radioValue
    })
    .then(() => {
      console.log("Successfully update project: ");
    })
    .catch(error => {
      console.error("fail to update: ", error);
    });
}

const ProjectList = () => {
  const projects = useProject();

  return (
    <Modal open dimmer="blurring">
      <div style={{ float: "right" }}>
        <Link to={"/home/" + id + "/project"}>
          <Icon name="close" size="large" />
        </Link>
      </div>
      <Modal.Header>Update Project</Modal.Header>

      <Modal.Description>
        <Page title="Update Project">
          <Helmet>
            <title>Update Project</title>
          </Helmet>
          <Grid.Column width={6} />
          <Grid.Column width={4}>
            <Form>
              <Form.Input
                inline
                className="projectEditField"
                label="Project Name"
                type="projectName"
                id="projectName"
                name="projectName"
              />
              {/* <Form.Field inline className="timepicker">
								<label>
									Project Start Date: (Note: Cannot Update)
									<DatePicker
										id="timeDatePicture"
										showTimeSelect
										timeFormat="HH:mm"
										timeIntervals={15}
										timeCaption="time"
										dateFormat="MMMM d, yyyy h:mm aa"
									/>
								</label>
							</Form.Field> */}

              <Form.Input
                inline
                className="projectEditField"
                label="Project Description"
                type="projectDescription"
                id="projectDescription"
                name="projectDescription"
              />

              <Form.Input
                inline
                className="projectEditField"
                label="Project Address"
                type="projectAddress"
                id="projectAddress"
                name="projectAddress"
              />

              <Form.Group inline>
                <label>Project Type</label>
                <Form.Radio
                  label="Active"
                  name="customerType"
                  id="customerTypeActive"
                  value="active"
                />
                <Form.Radio
                  label="Unactive"
                  name="customerType"
                  id="customerTypeUnactive"
                  value="unactive"
                />
              </Form.Group>
              <Form.Button
                inline
                type="submit"
                onClick={onSubmit}
                className="projectEditConfirmButton"
              >
                Update!
              </Form.Button>
            </Form>
          </Grid.Column>
        </Page>
      </Modal.Description>
      <Modal.Actions>
        <Link to={"/home/" + id + "/project"}>
          <Button>Close</Button>
        </Link>
      </Modal.Actions>
    </Modal>
  );
};

export default ProjectList;

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
import Geocode from "react-geocode";

var id, dateToUpdate, id2;

// hook project fields
function useProject() {
  const [projects, setProjects] = useState([]);
  let { projectid } = useParams();
  let { customerid } = useParams();
  id = projectid;
  id2 = customerid;
  let citiesRef = firestore.collection("Project").doc(projectid);

  var data = new Array();

  // assign values of input fields
  citiesRef
    .get()
    .then((doc) => {
      if (!doc.exists) {
        console.log("No such document!");
      } else {
        document.getElementById("projectName").value = doc.data().projectName;

        document.getElementById(
          "projectDescription"
        ).value = doc.data().projectDescription;
        document.getElementById(
          "projectAddress"
        ).value = doc.data().projectAddress;
        if (doc.data().projectType === "active") {
          document.getElementById("projectTypeActive").checked = true;
        } else {
          document.getElementById("projectTypeActive").checked = true;
        }
      }
    })
    .catch((err) => {
      console.log("Error getting document", err);
    });
}

// submis changes
function onSubmit(e) {
  e.preventDefault();

  Geocode.setApiKey("AIzaSyAFex0mi6Ezx0l9IJDPcCiXTw-Xsac0xqg");
  Geocode.setLanguage("en");

  let radioValue; // find the selected radio button
  radioValue = document.querySelector('input[name="projectType"]:checked')
    .value;

  // perform updates
  Geocode.fromAddress(document.getElementById("projectAddress").value).then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;

      firestore
        .collection("Project")
        .doc(id)
        .update({
          // customerEmail: document.getElementById("timeDatePicture").value,
          projectAddress: document.getElementById("projectAddress").value,
          projectDescription: document.getElementById("projectDescription")
            .value,
          projectName: document.getElementById("projectName").value,
          projectLatitude: lat,
          projectLongitude: lng,
          projectType: radioValue,
        })
        .then((gratz) => {
          // if successfuly updated
          alert("Successfully update the project.");
        })
        .catch((err) => {
          console.log("error");
        });

      console.log(lat, lng);
    },
    (error) => {
      //catch error
      console.error(error);
      alert("Not a valid address. Please try again.");
    }
  );
}

// interface of input fields
const ProjectList = () => {
  const projects = useProject();

  return (
    <Modal open dimmer="blurring">
      <div style={{ float: "right" }}>
        <Link to={"/home/" + id2 + "/project"}>
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
                placeholder="projectName..."
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
                placeholder="projectDescription..."
              />
              <Form.Input
                inline
                className="projectEditField"
                label="Project Address"
                name="projectAddress"
                id="projectAddress"
                placeholder="projectAddress..."
              />

              <Form.Group inline>
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
        <Link to={"/home/" + id2 + "/project"}>
          <Button>Close</Button>
        </Link>
      </Modal.Actions>
    </Modal>
  );
};

export default ProjectList;

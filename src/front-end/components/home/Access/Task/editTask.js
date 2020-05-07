import React from "react";
import firestore from "../../../../config/firestore";
import { from, Grid, Button, Modal, Icon, Form } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import Page from "../../../Page";
import { Link, userParams, useParams } from "react-router-dom";

let id;

function userProject(taskID) {
  id = taskID;
  let taskRef = firestore.collection("Task").doc(taskID);

  taskRef
    .get()
    .then((doc) => {
      if (!doc.exists) {
        console.log("No such document!");
      } else {
        document.getElementById("taskName").value = doc.data().taskName;
        document.getElementById(
          "taskDescription"
        ).value = doc.data().taskDescription;

        if (doc.data().taskType === "ongoing") {
          document.getElementById("taskType_ongoing").checked = true;
        } else {
          document.getElementById("taskType_completed").checked = true;
        }
      }
    })
    .catch((err) => {
      console.error("Error happened when updating task: " + err);
    });
}

function getCurrentTime() {
  let date = new Date();
  return date.toUTCString();
}

function onsubmit(e) {
  let radioValue;
  let completeDate;
  if (document.getElementById("taskType_completed").checked) {
    radioValue = "completed";
    completeDate = getCurrentTime();
  } else {
    radioValue = "ongoing";
    completeDate = "";
  }
  firestore
    .collection("Task")
    .doc(id)
    .update({
      taskName: document.getElementById("taskName").value,
      taskDescription: document.getElementById("taskDescription").value,
      taskType: radioValue,
      taskResolvedDate: completeDate,
    })
    .then(console.log("successfully update the task: " + id))
    .catch((err) => {
      console.error("Failed to update the invoce: " + err);
    });
}

const TaskUpdateField = () => {
  let { taskid } = useParams();
  const projects = userProject(taskid);
  let { customerid } = useParams();
  let { projectid } = useParams();

  console.log(projects);
  return (
    <Modal open dimmer="blurring">
      <div style={{ float: "right" }}>
        <Link to={"/home/" + customerid + "/" + projectid + "/access/task"}>
          <Icon name="close" size="large" />
        </Link>
      </div>

      <Modal.Header>Update Task</Modal.Header>
      <Modal.Description>
        <Page title="Update Task">
          <Helmet>
            <title>Update Task</title>
          </Helmet>
          <Grid.Column width={6} />
          <div style={{ marginLeft: "41%" }}>
            <Grid.Column width={4}>
              <Form>
                <Form.Input
                  className="taskNameEdit"
                  inline
                  label="taskName"
                  type="taskName"
                  id="taskName"
                  name="taskName"
                />
                <Form.Input
                  className="taskDescriptionEdit"
                  inline
                  label="taskDescription"
                  type="taskDescription"
                  id="taskDescription"
                  name="taskDescription"
                />
                <Form.Group inline style={{ marginLeft: "-7%" }}>
                  <label>Task type</label>
                  <Form.Radio
                    label="ongoing"
                    name="taskType"
                    id="taskType_ongoing"
                    value="ongoing"
                  />
                  <Form.Radio
                    label="completed"
                    name="taskType"
                    id="taskType_completed"
                    value="completed"
                  />
                </Form.Group>
                <Form.Button
                  type="submit"
                  onClick={onsubmit}
                  className="customerEditConfirm"
                >
                  Update!
                </Form.Button>
              </Form>
            </Grid.Column>
          </div>
        </Page>
      </Modal.Description>
      <Modal.Actions>
        <Link to={"/home/" + customerid + "/" + projectid + "/access/task"}>
          <Button>Close</Button>
        </Link>
      </Modal.Actions>
    </Modal>
  );
};

export default TaskUpdateField;

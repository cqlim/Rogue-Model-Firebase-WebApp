import React, { Component, useState, useEffect } from "react";
import firestore from "../../../config/firestore";
import { Table, Menu, Modal, Button, Icon } from "semantic-ui-react";

import {
  useParams,
  Link,
  Redirect,
  Switch,
  BrowserRouter
} from "react-router-dom";
import AddProject from "../../Firestore-components/Project/projectDataAdd";

var id;

function useProject() {
  const [projects, setProjects] = useState([]);
  let { customerid } = useParams();
  id = customerid;

  useEffect(() => {
    firestore.collection("Customer").onSnapshot(snapshot => {
      const newProject = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(newProject);
    });
  }, []);
  return projects;
}

const ProjectList = () => {
  const projects = useProject();
  let { customerid } = useParams();

  return (
    <div>
      <Modal open dimmer="blurring">
        <div style={{ float: "right" }}>
          <Link to={"/home/" + id + "/project"}>
            <Icon name="close" size="large" />
          </Link>
        </div>
        <Modal.Header>Add Project</Modal.Header>
        <Modal.Description>{<AddProject />}</Modal.Description>
        <Modal.Actions>
          <Link to={"/home/" + customerid + "/project"}>
            <Button>Close</Button>
          </Link>
        </Modal.Actions>
      </Modal>

      {/* </Page> */}
    </div>
  );
};

export default ProjectList;

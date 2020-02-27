import React, { Component, useState, useEffect } from "react";
import firestore from "../../../../config/firestore";
import { Helmet } from "react-helmet";
import { Grid, Icon, Header, Modal } from "semantic-ui-react";
import { Route, Link, Redirect, Switch, useParams } from "react-router-dom";
import style from "./File.css";
function useProject() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    firestore.collection("Document").onSnapshot(snapshot => {
      const newProject = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(newProject);
    });
  }, []);
  return projects;
}

const ProjectList = props => {
  let { projectid } = useParams();
  const projects = useProject();

  return (
    <div>
      <Header as="h1">Document</Header>

      <Helmet>
        <title>Access</title>
      </Helmet>

      <Grid columns={3} divided>
        <Grid.Row className="fileRows">
          {projects.map(project => (
            <div className="singleFile">
              <Icon name="file word outline" size="massive" color="blue" />
              <input
                type="checkbox"
                className="checkbox"
                onChange={() => props.clickToDelete(project.id)}
              />{" "}
              <Grid.Column className="fileName">
                <a
                  key={project.id}
                  href={project.documentLink}
                  data-id={project.id}
                >
                  {project.documentName}
                </a>{" "}
              </Grid.Column>
            </div>
          ))}
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default ProjectList;

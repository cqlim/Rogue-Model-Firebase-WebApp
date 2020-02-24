import React, { Component, useState, useEffect } from "react";
import firestore from "../../../../config/firestore";
import { Helmet } from "react-helmet";
import { Grid, Icon, Header, Label } from "semantic-ui-react";
import { Route, Link, Redirect, Switch, useParams } from "react-router-dom";
import style from "./viewCalendar.css";
function useProject() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    firestore.collection("Calender").onSnapshot(snapshot => {
      const newProject = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(newProject);
    });
  }, []);
  return projects;
}

const CalendarList = props => {
  let { projectid } = useParams();
  const projects = useProject();

  return (
    <div>
      <Header as="h1">Calendar from Project: {projectid}</Header>

      <Helmet>
        <title>Calendar</title>
      </Helmet>
      <Grid columns={3} divided>
        <Grid.Row>
          {projects.map(project => (
            <div className="calendarDiv">
              <Icon
                name="calendar alternate outline"
                size="massive"
                color="blue"
              />
              <input
                type="checkbox"
                onChange={() => props.clickToDelete(project.id)}
              />
              <Grid.Column href={project.calanderLink}>
                {/* <a
                  key={project.id}
                  href={project.calanderLink}
                  data-id={project.id}
                ></a> */}
                <label className="label">{project.calanderName}</label>
              </Grid.Column>
            </div>
          ))}
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default CalendarList;

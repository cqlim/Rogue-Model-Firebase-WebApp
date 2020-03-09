import React, { Component } from "react";
import { Header, Icon, Menu, Sidebar, Dropdown } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import { Route, Link, Redirect, Switch, useParams } from "react-router-dom";

function ProjectDetailNav() {
  let { projectid } = useParams();
  let { customerid } = useParams();
  return (
    <div>
      <Menu>
        <Link to={"/home/" + customerid + "/" + projectid + "/access/document"}>
          <Menu.Item name="Document" />
        </Link>
        <Link to={"/home/" + customerid + "/" + projectid + "/access/calendar"}>
          <Menu.Item name="Calendar" />
        </Link>
        <Link to={"/home/" + customerid + "/" + projectid + "/access/invoice"}>
          <Menu.Item name="Invoice" />
        </Link>
        <Link to={"/home/" + customerid + "/" + projectid + "/access/task"}>
          <Menu.Item name="Tasks" />
        </Link>
      </Menu>
    </div>
  );
}

export default ProjectDetailNav;

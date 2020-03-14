import firebase from "../../../config/firestore";
import { Table, Input, Icon, Button } from "semantic-ui-react";
import { Route, Link, Redirect, Switch, BrowserRouter } from "react-router-dom";
import React, { Component, useState, useEffect } from "react";

export const SpellInput = ({ spell }) => {
  const [name, setName] = React.useState(spell.name);

  const onDelete = () => {
    console.log(spell.projectID);
    firebase
      .collection("Project")
      .doc(spell.projectID)
      .delete();
    window.location.reload();
  };

  const confirmBox = () => {
    if (window.confirm("Are you sure to apply deletion")) {
      onDelete();
    } else {
      console.log("You cancel the deletion");
    }
  };

  return (
    <>
      <Link
        to={
          "/home/" + spell.customerID + "/" + spell.projectID + "/editProject"
        }
        key={spell.projectID}
      >
        <Button>Update</Button>
      </Link>
      <Button onClick={() => confirmBox()}>Delete</Button>
    </>
  );
};

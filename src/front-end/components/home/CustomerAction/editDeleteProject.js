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
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch(error => {
        console.error("Error removing document: ", error);
      });
    // conso

    deleteDetails("Calender", spell.projectID);
    deleteDetails("Document", spell.projectID);
    deleteDetails("Invoice", spell.projectID);
    deleteDetails("Task", spell.projectID);
    window.location.reload();
  };

  const deleteDetails = (collectionName, projectID) => {
    var query = firebase
      .collection(collectionName)
      .where("projectID", "==", projectID);

    query.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.delete();
      });
    });
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

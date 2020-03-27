import firebase from "../../../config/firestore";
import firestore from "../../../config/firestore";
import { Table, Input, Icon, Button } from "semantic-ui-react";
import { Route, Link, Redirect, Switch, BrowserRouter } from "react-router-dom";
import React, { Component, useState, useEffect } from "react";
import EditCustomerModal from "../CustomerAction/addCustomerModal";

export const SpellInput = ({ spell }) => {
  const [name, setName] = React.useState(spell.name);

  const onDelete = () => {
    console.log(spell.customerID);
    firebase
      .collection("Customer")
      .doc(spell.customerID)
      .delete();
  };

  const deleteProject = () => {
    var projectQuery = firebase
      .collection("Project")
      .where("customerID", "==", spell.customerID);

    projectQuery.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref
          .delete()
          .then(() => {
            console.log("Document successfully deleted!");
          })
          .catch(error => {
            console.error("Error removing document: ", error);
          });
        // console.log("Deleted project: " + doc.ref.id);
        // help to delete the project details include: Calender, Document, Invoice, Task
        deleteDetails("Calender", doc.ref.id);
        deleteDetails("Document", doc.ref.id);
        deleteDetails("Invoice", doc.ref.id);
        deleteDetails("Task", doc.ref.id);
      });
    });
  };

  const deleteDetails = (collectionName, projectID) => {
    var query = firebase
      .collection(collectionName)
      .where("projectID", "==", projectID);

    query.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref
          .delete()
          .then(() => {
            console.log("Document successfully deleted!");
          })
          .catch(error => {
            console.error("Error removing document: ", error);
          });
        // conso
      });
    });
  };

  const confirmBox = () => {
    if (window.confirm("Are you sure to apply deletion")) {
      onDelete();
      deleteProject();
    } else {
      console.log("You cancel the deletion");
    }
  };

  return (
    <>
      <Link
        to={"/home/" + spell.customerID + "/editCustomer"}
        key={spell.customerID}
      >
        <Button>Update</Button>
      </Link>
      <Button onClick={() => confirmBox()}>Delete</Button>
    </>
  );
};

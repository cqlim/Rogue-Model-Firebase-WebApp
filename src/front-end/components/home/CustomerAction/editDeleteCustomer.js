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
        to={"/home/" + spell.customerID + "/editCustomer"}
        key={spell.customerID}
      >
        <Button>Update</Button>
      </Link>
      <Button onClick={() => confirmBox()}>Delete</Button>
    </>
  );
};

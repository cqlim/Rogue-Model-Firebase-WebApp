import React, { Component } from "react";
import firebase from "../src/config/firestore";
import { firestore } from "firebase";
const faker = require("faker");
const fakeIt = () => {
  return firebase
    .collection("Customer")
    .add({
      customerAddress: faker.address.city(),
      customerEmail: faker.internet.email(),
      customerFirstName: faker.name.firstName(),
      customerID: "",
      customerLastName: faker.name.lastName(),
      customerPhoneNumber: faker.phone.phoneNumber(),
      customerType: "active",
      customerUsername: faker.internet.userName()
    })
    .then(function(docRef) {
      firebase
        .collection("Customer")
        .doc(docRef.id)
        .update({ customerID: docRef.id })
        .catch(err => {
          console.error(err);
          return;
        });
    });
};

const fakes = function() {
  return Array(20)
    .fill(0)
    .forEach(fakeIt);
};

const button = function() {
  return <button onClick={() => fakes()}>Click to add 20 customers</button>;
};
export default button;

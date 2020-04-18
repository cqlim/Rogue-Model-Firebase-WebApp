import React, { useState, useEffect } from "react";
import firestore from "../config/firestore";

function useCustomerName(customerid) {
  const [userName, setUserName] = useState("");
  //   let { customerid } = useParams();
  useEffect(() => {
    firestore
      .collection("Customer")
      .where("customerID", "==", customerid)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log("No matching customerID");
          return;
        }
        const customer = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserName(Object.values(customer)[0]["customerUsername"]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return userName;
}

function useProjectName(projectid) {
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    firestore
      .collection("Project")
      .where("projectID", "==", projectid)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log("No matching projectID");
          return;
        }
        const customer = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjectName(Object.values(customer)[0]["projectName"]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return projectName;
}

const functions = {
  useCustomerName: useCustomerName,
  useProjectName: useProjectName,
};

export default functions;

import React, { useState, useEffect } from "react";
import firestore from "../../../../config/firestore";
import { Modal, Button } from "semantic-ui-react";
import { link, Link, useParams } from "react-router-dom";
import EditInvoice from "./invoiceEdit";

const ProjectList = props => {
  return <Modal.Description>{<EditInvoice />}</Modal.Description>;
};

export default ProjectList;

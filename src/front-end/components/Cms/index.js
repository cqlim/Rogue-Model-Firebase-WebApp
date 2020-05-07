/* eslint-disable arrow-body-style */
import React from "react";
import { Header, Icon, Menu, Sidebar, Dropdown } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import styles from "./styles.css";
import { Route, Link, Redirect, Switch, BrowserRouter } from "react-router-dom";
import firebase from "../../config/Fire";
import FourOhFour from "../FourOhFour/index";
import signUp from "../signUp/signup";
import home from "../home/customer";
import search from "../searchBar/searchBar";
import project from "../home/home-project";
import addCustomer from "../home/CustomerAction/addCustomerModal";
import editCustomer from "../Firestore-components/Customer/customerDataEdit";
import addProjects from "../home/ProjectAction/addProjectModal";
import editProject from "../Firestore-components/Project/projectDataEdit";
import accessNav from "../home/Access/nav";
import accessDocument from "../home/Access/documentFile/fileAll";
import accessDocumentAdd from "../home/Access/documentFile/addFile";

import accessTask from "../home/Access/Task/taskAll";
import accessTaskAdd from "../home/Access/Task/addTask";
import editTask from "../home/Access/Task/editTask";

import accessInvoice from "../home/Access/Invoice/invoiceAll";
import accessInvoiceAdd from "../home/Access/Invoice/addInvoice";
import editInvoice from "../home/Access/Invoice/editInvoiceModal";

import accessCalendar from "../home/Access/Calendar/calendarAll";
import accessCalendarAdd from "../home/Access/Calendar/addCalendar";

import projectMap from "../LiveMap/index";

const handleLogout = (history) => () => {
  firebase.auth().signOut();
  history.push("/");
  console.log("you have been logged out. boo!");
};

const Cms = ({ history }) => {
  // Check user is logged in
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      console.log("is Signed in");
    } else {
      // No user is signed in.
      firebase.auth().signOut();
      history.push("/");
    }
  });

  return (
    <div>
      <Helmet>
        <title>CMS</title>
      </Helmet>
      <Sidebar as={Menu} inverted visible vertical width="thin" icon="labeled">
        <Link to="/home">
          <Menu.Item name="Home">
            <Icon name="home" />
            Home
          </Menu.Item>
        </Link>

        <Link to="/home/searchBar">
          <Menu.Item name="search">
            <Icon name="search" />
            Search
          </Menu.Item>
        </Link>

        <Link to="/home/signUp">
          <Menu.Item name="createAccount">
            <Icon name="user plus" />
            Create account
          </Menu.Item>
        </Link>

        <Link to="/home/project-map">
          <Menu.Item name="Map project">
            <Icon name="map outline" />
            Map project
          </Menu.Item>
        </Link>

        <Menu.Item name="logout" onClick={handleLogout(history)}>
          <Icon name="power" />
          Logout
        </Menu.Item>
      </Sidebar>

      <div className={styles.mainBody}>
        <Switch>
          <Route exact path="/home" component={home} />
          <Route exact path="/home/searchBar" component={search} />
          <Route exact path="/home/addCustomer" component={addCustomer} />
          <Route
            exact
            path="/home/:customerid/editCustomer"
            component={editCustomer}
          />
          <Route
            exact
            path="/home/:customerid/:projectid/editProject"
            component={editProject}
          />
          <Route path="/home/:customerid/addprojects" component={addProjects} />
          <Route path="/home/signUp" component={signUp} />
          <Route path="/home/:customerid/project" component={project} />
          <Route
            exact
            path="/home/:customerid/:projectid/access"
            exact
            component={accessNav}
          />

          <Route
            path="/home/:customerid/:projectid/access/document"
            component={accessDocument}
          />
          <Route
            path="/home/:customerid/:projectid/access/documentAdd"
            component={accessDocumentAdd}
          />
          <Route
            path="/home/:customerid/:projectid/access/task"
            component={accessTask}
          />
          <Route
            path="/home/:customerid/:projectid/access/taskAdd"
            component={accessTaskAdd}
          />
          <Route
            path="/home/:customerid/:projectid/:taskid/editTask"
            component={editTask}
          />
          <Route
            path="/home/:customerid/:projectid/access/invoice"
            component={accessInvoice}
          />

          <Route
            path="/home/:customerid/:projectid/access/invoiceAdd"
            component={accessInvoiceAdd}
          />

          <Route
            path="/home/:customerid/:projectid/:invoiceid/editInvoice"
            component={editInvoice}
          />

          <Route
            path="/home/:customerid/:projectid/access/calendar"
            component={accessCalendar}
          />
          <Route
            path="/home/:customerid/:projectid/access/calendarAdd"
            component={accessCalendarAdd}
          />

          <Route path="/home/project-map" component={projectMap} />

          <Route component={FourOhFour} />
        </Switch>
      </div>
    </div>
  );
};

export default Cms;

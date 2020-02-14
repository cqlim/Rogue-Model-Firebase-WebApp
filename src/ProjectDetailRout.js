import React from "react";
import ProjectDetail from "./ProjectDetail";
import Calendar from "./calenderDetail";
import Invoice from "./invoicePage";
import ProjectDetailNav from "./ProjectDetailNav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const ProjectDetailRoute = () => {
  return (
    <Router>
      <div>
        <Route path="/" component={ProjectDetailNav} />
        <Switch>
          <Route path="/ProjectDetail" component={ProjectDetail} />
          <Route path="/calenderDetail" component={Calendar} />
          <Route path="/invoicePage" component={Invoice} />
        </Switch>
      </div>
    </Router>
  );
};

export default ProjectDetailRoute;

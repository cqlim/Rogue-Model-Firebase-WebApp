import React, { Component } from "react";
import { Link } from "react-router-dom";

function ProjectDetailNav() {
  return (
    <nav>
      <ul>
        <Link to="/ProjectDetail">
          <li>Document</li>
        </Link>
        <Link to="/calenderDetail">
          <li>Calendar</li>
        </Link>
        <Link to="invoicePage">
          <li>Invoice</li>
        </Link>
        <Link>
          <li>Tasks</li>
        </Link>
      </ul>
    </nav>
  );
}

export default ProjectDetailNav;

import React, { useState, useEffect } from "react";
import firestore from "./config/firestore";

function useProject() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    firestore.collection("Task").onSnapshot(snapshot => {
      const newProject = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(newProject);
    });
  }, []);
  return projects;
}

function convertToDayTime(timeStamp) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let date = timeStamp.toDate();
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  return months[month] + " " + day + ", " + year;
}

const TaskTable = props => {
  const projects = useProject();
  return (
    <div>
      <table>
        <tr>
          <th>Check</th>
          <th>Title</th>
          <th>Ordered By</th>
          <th>Date placed</th>
        </tr>
        {projects.map(project => (
          <div key={project.id}>
            <tr>
              <td>
                <input
                  type="checkbox"
                  key={project.id}
                  onChange={() => props.clickToDelete(project.id)}
                />
              </td>
              <td>{project.taskName}</td>
              <td>{project.userID}</td>
              <td>{convertToDayTime(project.taskDueDate)}</td>
            </tr>
          </div>
        ))}
      </table>
    </div>
  );
};

export default TaskTable;

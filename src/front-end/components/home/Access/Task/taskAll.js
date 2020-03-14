import React, { Component } from "react";
import TaskTable from "./viewTasks";
import TaskDelete from "../../deleteAction/deleteButton";
import Addtask from "./addTask";
import { Button } from "semantic-ui-react";
import { Link, Route, withRouter } from "react-router-dom";
import Nav from "../nav";

class TaskPage extends Component {
  state = {
    userAddFile: false,
    deletionList: []
  };

  toggle = () => {
    let currentState = this.state.userAddFile;
    this.setState({ userAddFile: !currentState });
  };

  handleCheck = id => {
    // console.log("The clicked item has ID: ", id);
    let currentState = [...this.state.deletionList];
    if (this.state.deletionList.indexOf(id) < 0) {
      currentState.push(id);
      this.setState({ deletionList: currentState });
    } else {
      let index = this.state.deletionList.indexOf(id);
      currentState.splice(index, 1);
      this.setState({ deletionList: currentState });
    }
  };

  render() {
    return (
      <div>
        <Nav />
        {this.state.userAddFile ? (
          <div>
            <Addtask />
          </div>
        ) : (
          <div>
            <TaskTable clickToDelete={id => this.handleCheck(id)} />
            <TaskDelete
              deleteList={this.state.deletionList}
              collectionName="Task"
            />
          </div>
        )}
        <Link
          to={
            "/home/" +
            this.props.match.params.customerid +
            "/" +
            this.props.match.params.projectid +
            "/access/taskAdd"
          }
        >
          <Button onClick={this.toggle}>Add task</Button>
        </Link>
        {/* <Link
          to={
            "/home/" +
            this.props.match.params.customerid +
            "/" +
            this.props.match.params.projectid +
            "/access"
          }
        >
          <Button>Back</Button>
        </Link> */}
      </div>
    );
  }
}

export default withRouter(TaskPage);

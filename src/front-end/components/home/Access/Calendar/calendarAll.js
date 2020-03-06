import React, { Component } from "react";
import CalendersTable from "./viewCalendar";
import DeleteButton from "./deleteCalendar";
import CalenderAdd from "./addCalendar";
import { Button, Modal } from "semantic-ui-react";
import { Link } from "react-router-dom";

class CalanderDetail extends Component {
  state = {
    userAddCalander: false,
    deletionList: []
  };

  toggle = () => {
    this.setState({ userAddCalander: !this.state.userAddCalander });
  };

  handleCheck = id => {
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
        {this.state.userAddCalander ? (
          <div>
            <CalenderAdd />
          </div>
        ) : (
          <div>
            <CalendersTable clickToDelete={id => this.handleCheck(id)} />
            <DeleteButton deleteList={this.state.deletionList} />
          </div>
        )}
        <Link
          to={
            "/home/" +
            this.props.match.params.customerid +
            "/" +
            this.props.match.params.projectid +
            "/access/calendarAdd"
          }
        >
          <Button onClick={this.toggle}>Add Calender</Button>
        </Link>
      </div>
    );
  }
}

export default CalanderDetail;

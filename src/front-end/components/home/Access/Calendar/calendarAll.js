import React, { Component } from "react";
import CalendersTable from "./viewCalendar";
import DeleteButton from "./deleteCalendar";
import CalenderAdd from "./addCalendar";

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
				<button onClick={this.toggle}>Add Calender</button>
			</div>
		);
	}
}

export default CalanderDetail;

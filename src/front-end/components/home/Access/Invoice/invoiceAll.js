import React, { Component } from "react";
import InvoiceTable from "./viewInvoice";
import InvoiceDelete from "./deleteInvoice";
import AddInvoice from "./addInvoice";
import { Button } from "semantic-ui-react";
import { Link, Route, withRouter } from "react-router-dom";

class InvoicePage extends Component {
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
				{this.state.userAddFile ? (
					<div>
						<AddInvoice />
					</div>
				) : (
					<div>
						<InvoiceTable clickToDelete={id => this.handleCheck(id)} />
						<InvoiceDelete deleteList={this.state.deletionList} />
					</div>
				)}
				<Button onClick={this.toggle}>Add Invoice</Button>
				<Link
					to={
						"/home/" +
						this.props.match.params.customerid +
						"/" +
						this.props.match.params.projectid +
						"/access"
					}
				>
					<Button>Back</Button>
				</Link>
			</div>
		);
	}
}

export default withRouter(InvoicePage);

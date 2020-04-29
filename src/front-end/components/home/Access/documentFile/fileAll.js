import React, { Component } from "react";
import FilesTable from "./viewFile";
import DeleteButton from "../../deleteAction/deleteButton";
import AddFile from "./addFile";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Nav from "../nav";

class ProjectDetail extends Component {
  state = {
    userAddFile: false,
    deletionList: [],
  };

  toggle = () => {
    this.setState({ userAddFile: !this.state.userAddFile });
  };

  handleCheck = (id) => {
    let currentSate = [...this.state.deletionList];
    // if the id is not on delete list then add it
    if (this.state.deletionList.indexOf(id) < 0) {
      currentSate.push(id);
      this.setState({ deletionList: currentSate });
    } else {
      // if already exist then just delete it once the box unchecked
      let index = this.state.deletionList.indexOf(id);
      currentSate.splice(index, 1);
      this.setState({ deletionList: currentSate });
    }
    // console.log(this.state.deletionList);
  };
  render() {
    return (
      <div>
        <Nav />
        {this.state.userAddFile ? (
          <div>
            <AddFile />
          </div>
        ) : (
          <div>
            <FilesTable clickToDelete={(id) => this.handleCheck(id)} />
            <DeleteButton
              deleteList={this.state.deletionList}
              collectionName="Document"
            />
          </div>
        )}
        <Link
          to={
            "/home/" +
            this.props.match.params.customerid +
            "/" +
            this.props.match.params.projectid +
            "/access/documentAdd"
          }
        >
          <Button onClick={this.toggle}>Add File</Button>
        </Link>
        <Link to={"/home/" + this.props.match.params.customerid + "/project"}>
          <Button>Back</Button>
        </Link>
      </div>
    );
  }
}

export default ProjectDetail;

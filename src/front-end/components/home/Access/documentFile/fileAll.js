import React, { Component } from "react";
import FilesTable from "./viewFile";
import DeleteButton from "./deleteFile";
import AddFile from "./addFile";
import { Button } from "semantic-ui-react";

class ProjectDetail extends Component {
  state = {
    userAddFile: false,
    deletionList: []
  };

  toggle = () => {
    this.setState({ userAddFile: !this.state.userAddFile });
  };

  handleCheck = id => {
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
        {this.state.userAddFile ? (
          <div>
            <AddFile />
          </div>
        ) : (
          <div>
            <FilesTable clickToDelete={id => this.handleCheck(id)} />
            <DeleteButton deleteList={this.state.deletionList} />
          </div>
        )}
        <Button onClick={this.toggle}>Add File</Button>
      </div>
    );
  }
}

export default ProjectDetail;

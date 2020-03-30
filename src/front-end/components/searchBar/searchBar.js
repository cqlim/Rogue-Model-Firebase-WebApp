import React, { Component } from "react";
import algoliasearch from "algoliasearch";
import SearchDisplay from "./searchDisplay";
const dotenv = require("dotenv");
dotenv.config();

const APP_ID = "A7LVCLUT5C";
const SEARCH_KEY = "d97846da62585e259b242efbd5026a2a";
const INDEX_NAME = "Customer";

const client = algoliasearch(APP_ID, SEARCH_KEY);
const index = client.initIndex(INDEX_NAME);

class searchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      searchResult: []
    };

    // this.searchInAlgolia = this.searchInAlgolia.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  searchInAlgolia() {
    index.search(this.state.query).then(responses => {
      this.setState({ searchResult: responses.hits });
    });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.query}
          onChange={this.handleChange.bind(this)}
          onKeyUp={this.searchInAlgolia.bind(this)}
          name="query"
          placeholder="search: id, name, phone, email, address, userName..."
          style={{
            marginTop: "10%",
            marginLeft: "30%",
            height: "35px",
            width: "350px"
          }}
        />
        <SearchDisplay searchResult={this.state.searchResult} />
      </div>
    );
  }
}

export default searchBar;

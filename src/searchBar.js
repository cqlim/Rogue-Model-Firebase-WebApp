import algoliasearch from "algoliasearch/lite";
import { InstantSearch, Hits, connectSearchBox } from "react-instantsearch-dom";
import Autocomplete from "./Autocomplete";
import React from "react";

const VirtualSearchBox = connectSearchBox(() => null);

const searchClient = algoliasearch(
  "A7LVCLUT5C",
  "d97846da62585e259b242efbd5026a2a"
);

class App extends Component {
  state = {
    query: ""
  };

  render() {
    const { query } = this.state;

    return (
      <div>
        <InstantSearch indexName="demo_ecommerce" searchClient={searchClient}>
          <Autocomplete />
        </InstantSearch>

        <InstantSearch indexName="demo_ecommerce" searchClient={searchClient}>
          <VirtualSearchBox defaultRefinement={query} />
          <Hits />
        </InstantSearch>
      </div>
    );
  }
}

class Autocomplete extends Component {
  // ...

  onChange = (event, { newValue }) => {
    if (!newValue) {
      this.props.onSuggestionCleared();
    }

    this.setState({ value: newValue });
  };

  // ...

  render() {
    const { hits, onSuggestionSelected } = this.props;

    // ...

    return (
      <AutoSuggest
        onSuggestionSelected={onSuggestionSelected}
        // ...
      />
    );
  }
}

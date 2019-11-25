// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Styles
import './AutocompleteSearch.css';

class AutocompleteSearch extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form>
        <input
          className="search-input"
          type="text"
          placeholder="What are you looking for today?"
          aria-label="Search" 
        />
      </form>
    )
  }
};

AutocompleteSearch.propTypes = {
  suggestions: PropTypes.array
}

AutocompleteSearch.defaultProps = {
  suggestions: []
}

export default AutocompleteSearch;

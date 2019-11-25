// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Styles
import './AutocompleteSearch.css';

class AutocompleteSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      relevantSuggestions: [],
      showSuggestions: false
    }

    this.onChange = this.onChange.bind(this);
  }

  onChange = e => {
    const { suggestions } = this.props,
          currentInput = e.currentTarget.value;

    if (currentInput !== '') {
      const currentSuggestions = suggestions.filter(
        suggestion => suggestion.toLowerCase().indexOf(currentInput.toLowerCase()) > -1
      );

      this.setState({
        showSuggestions: true,
        relevantSuggestions: currentSuggestions
      });
    } else {
      this.setState({
        showSuggestions: false,
        relevantSuggestions: []
      });
    }
  }

  render() {
    const { onChange } = this,
          { relevantSuggestions, showSuggestions } = this.state,
          suggestionList = showSuggestions ? (
            <ul>
              {relevantSuggestions.map( (suggestion, index) => {
                return <li key={index}>{suggestion}</li>;
              })}
            </ul>
          ) : '';

    return (
      <div>
        <form>
          <input
            className="search-input"
            type="text"
            placeholder="What fruit are you looking for today?"
            aria-label="Search" 
            onChange={onChange}
          />
          { suggestionList }
        </form>
      </div>
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

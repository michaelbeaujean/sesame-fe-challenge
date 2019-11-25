// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Styles
import './AutocompleteSearch.css';

class AutocompleteSearch extends Component {
  constructor(props) {
    super(props);

    // Component state that we will connec to user input and expected behavior
    this.state = {
      // Relevant suggestions based on user input
      relevantSuggestions: [],
      // Boolean to determine if we show the suggestion list
      showSuggestions: false,
      // User's input to the search field
      userInput: ''
    }

    // Binding methods
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  // Change event for user input field
  onChange = e => {
    const { suggestions } = this.props,
          currentInput = e.currentTarget.value;

    // If the user input is not empty, filter through suggestions and update state accordingly
    if (currentInput !== '') {
      const currentSuggestions = suggestions.filter(
        suggestion => suggestion.toLowerCase().indexOf(currentInput.toLowerCase()) > -1
      );

      this.setState({
        userInput: currentInput,
        showSuggestions: true,
        relevantSuggestions: currentSuggestions
      });
    } else {
      // Else, reset the state to default
      this.setState({
        userInput: '',
        showSuggestions: false,
        relevantSuggestions: []
      });
    }
  }

  // Click event for suggestion list item
  onClick = e => {
    e.preventDefault();
    e.stopPropagation();

    const suggestion = e.currentTarget.innerText;

    // Update the userInput with the clicked on suggestion and hide the list
    this.setState({
      userInput: suggestion,
      showSuggestions: false
    });
  }

  render() {
    const { onChange, onClick } = this,
          { userInput, relevantSuggestions, showSuggestions } = this.state,
          // If showSuggestions is true, render the suggestion list
          // Else return a blank string
          suggestionList = showSuggestions ? (
            <ul>
              {relevantSuggestions.map( (suggestion, index) => {
                return (
                  <li 
                    key={ index }
                    onClick={ onClick }
                  >
                    { suggestion }
                  </li>
                );
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
            onChange={ onChange }
            value={ userInput }
          />
          { suggestionList }
        </form>
      </div>
    )
  }
};

// Prop types/defaults
AutocompleteSearch.propTypes = {
  suggestions: PropTypes.array
}

AutocompleteSearch.defaultProps = {
  suggestions: []
}

export default AutocompleteSearch;

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
      // Index of suggestions for up/down functionality
      highlightedSuggestion: 0,
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
        highlightedSuggestion: 0,
        userInput: currentInput,
        showSuggestions: true,
        relevantSuggestions: currentSuggestions
      });
    } else {
      // Else, reset the state to default
      this.setState({
        highlightedSuggestion: 0,
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

  onKeyDown = e => {
    const { keyCode } = e,
          { highlightedSuggestion, relevantSuggestions } = this.state;

    // Up key
    if (keyCode === 38) {
      if (highlightedSuggestion > 0) {
        this.setState({
          highlightedSuggestion: highlightedSuggestion - 1
        });
      }
    // Down key
    } else if (keyCode === 40) {
      if (highlightedSuggestion < relevantSuggestions.length - 1) {
        this.setState({
          highlightedSuggestion: highlightedSuggestion + 1
        });
      }
    // Enter key
    } else if (keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();

      this.setState({
        userInput: relevantSuggestions[highlightedSuggestion],
        showSuggestions: false
      });
    }
  }

  render() {
    const { onChange, onClick, onKeyDown } = this,
          { highlightedSuggestion, userInput, relevantSuggestions, showSuggestions } = this.state,
          // If showSuggestions is true, render the suggestion list
          // Else return a blank string
          suggestionList = showSuggestions ? (
            <ul className="suggestions">
              {relevantSuggestions.map( (suggestion, index) => {
                const highlighted = (index === highlightedSuggestion) ? 'highlighted' : '';

                return (
                  <li 
                    key={ index }
                    onClick={ onClick }
                  >
                    <a
                      href={ `#${suggestion}` }
                      className={ highlighted }
                    >
                      { suggestion }
                    </a>
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
            onKeyDown={ onKeyDown }
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

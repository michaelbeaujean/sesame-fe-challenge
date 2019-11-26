// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import AutocompleteSearch from '../AutocompleteSearch/AutocompleteSearch';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      suggestions: []
    }

    this.fetchSuggestions = this.fetchSuggestions.bind(this);
  }

  fetchSuggestions() {
    const { suggestionsPath } = this.props;

    fetch(suggestionsPath)
      .then(response => response.json())
      .then(json => {
        this.setState({
          suggestions: json
        })
      })
      .catch(error => {
        console.log(`There was an error when trying to fetch the suggestions: ${error}`);
      })
  }

  componentDidMount() {
    // Fetch our suggestions once component mounts
    this.fetchSuggestions();
  }

  render() {
    return (
      <div className="container">
        <h1><span className="no-wrap">The Sesame</span> <span className="no-wrap">Front-End Challenge</span></h1>
        <p>Search for a fruit or vegetable below!</p>
        <AutocompleteSearch suggestions={this.state.suggestions} />
      </div>
    );
  }
}

// Prop types/defaults
App.propTypes = {
  suggestionsPath: PropTypes.string
}

App.defaultProps = {
  suggestionsPath: ''
}

export default App;

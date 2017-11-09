import Autosuggest from 'react-autosuggest';
import React from 'react'

class Autosuggestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions: []
        };
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    }

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested({value}) {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested() {
        this.setState({
            suggestions: []
        });
    };

    getSuggestionValue(suggestion) {
        return suggestion;
    }

    renderSuggestion(suggestion) {
        return <div>
            {suggestion}
        </div>

    }


    getSuggestions(value) {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        const {suggestionList} = this.props;
        const a = inputLength === 0 ? [] : suggestionList.filter(element =>
            element.toLowerCase().slice(0, inputLength) === inputValue
        );
        return a.splice(0, 3);
    };

    render() {
        const {suggestions} = this.state;
        const {label,onChange,value}=this.props;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder:label,
            value: value,
            onChange: onChange
        };

        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
            />
        );
    }
}

Autosuggestion.propTypes = {
    suggestionList: React.PropTypes.array.isRequired,
    label: React.PropTypes.string.isRequired,
    onChange:React.PropTypes.func.isRequired,
    value:React.PropTypes.any.isRequired
};

export default Autosuggestion;
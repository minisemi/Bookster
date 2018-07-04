import React, { Component } from 'react';
import '../../static/BookingsSearch.css';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
//import match from 'autosuggest-highlight/match';
//import parse from 'autosuggest-highlight/parse';

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
        return [];
    }

    return escapedValue;
}

//Decides what to do when selecting a suggestion (which is to go to the page for that bookable/company)
function onSuggestionSelected(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }, changeRoute){

    switch (suggestion.type){
        case 'bookable':
           // browserHistory.push(`/${suggestion.companyAlias}/${suggestion.bookableAlias}`);
            changeRoute(`/${suggestion.companyAlias}/${suggestion.bookableAlias}`);
            break;
        case 'company':
            changeRoute(`/${suggestion.companyAlias}`);
           // browserHistory.push(`/${suggestion.companyAlias}`);
            break;
        default:
            break;
    }
}

function getSuggestionValue(suggestion) {
    return `${suggestion.name} ${suggestion.city}`;
}

//Deciedes how suggestions are rendered
function renderSuggestion(suggestion, { query }) {
    const suggestionText = `${suggestion.name} ${suggestion.city}`;
    //const matches = match(suggestionText, query);
    //const parts = parse(suggestionText, matches);
    let pic;
    if (suggestion.type==="bookable"){
        pic = { backgroundImage: `url(${suggestion.image})` };

    } else{
        pic = { backgroundImage: `url(${suggestion.image})` };

    }
    return (
        <span className={'suggestion-content '} style={pic}>
        <span className="name">
            {suggestionText}
        </span>
      </span>
    );

    //SAVING THIS FOR FUTURE IMPLEMENTATION OF HIGHLIGHTING FEATURES OF SEARCHES
    /*return (
     <span className={'suggestion-content ' + suggestion.id}>
     <span className="name">
     {
     parts.map((part, index) => {
     const className = part.highlight ? 'highlight' : null;

     return (
     <span className={className} key={index}>{part.text}</span>
     );
     })
     }
     </span>
     </span>
     );*/
}

function renderSectionTitle(section) {
    return (
        <strong>{section.section}</strong>
    );
}

function getSectionSuggestions(section) {
    return section.suggestions;
}

function shouldRenderSuggestions(value) {
    return value.trim().length > 2;
}



export default class BookingsSearch extends Component {

    static propTypes = {
        getSearchResults: PropTypes.func.isRequired,
        changeRoute: PropTypes.func.isRequired,
        cleared: PropTypes.bool.isRequired,
        suggestions: PropTypes.array,
    };

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            suggestions: props.suggestions || [],
        };
    }


    componentWillReceiveProps(nextProps){
        if (nextProps.suggestions !== this.props.suggestions) {
            this.setState({ suggestions: nextProps.suggestions });
        } else if (nextProps.cleared !== this.props.cleared) {
            this.setState({ value:'' });
        }
    }

    onChange = (event, { newValue, method }) => {
        this.setState({
            value: newValue
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.props.getSearchResults(getSuggestions(value));
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    storeInputReference = autosuggest => {
        if (autosuggest !== null) {
            this.input = autosuggest.input;
        }
    };

    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: "Search for companies",
            value,
            type:'search',
            onChange: this.onChange,
        };

        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                ref={this.storeInputReference}
                onSuggestionSelected={(events, {suggestion}) => onSuggestionSelected(event, {suggestion}, this.props.changeRoute)}
                multiSection={true}
                renderSectionTitle={renderSectionTitle}
                getSectionSuggestions={getSectionSuggestions}
                highlightFirstSuggestion={true}
                shouldRenderSuggestions={shouldRenderSuggestions}
            />

        );
    }

}



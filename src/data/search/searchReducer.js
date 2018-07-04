import {
    SET_SEARCH_RESULTS,
} from './searchActions';

export default (state = {}, action) => {
    switch (action.type) {
        case SET_SEARCH_RESULTS:
            return {
                ...state,
                searchResults: action.payload
            };
        default:
            return state;
    }
};
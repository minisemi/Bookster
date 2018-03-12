import {
    GET_BOOKABLES
} from './bookablesActions';

const INITIAL_STATE = {
    bookables: {bookable1: "tvättstuga"},
    bokningar: "hej"
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_BOOKABLES:
            return {
                ...state,
                bookables: action.payload
            };
        default:
            return state;
    }
};
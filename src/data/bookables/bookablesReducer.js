import {
    GET_CURRENT_BOOKINGS,
    GET_FAVOURITES,
    GET_RECOMMENDATIONS,
    GET_BOOKABLE,
    ADD_FAVOURITE,
    DELETE_FAVOURITE,
} from './bookablesActions';

const INITIAL_STATE = {

};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_CURRENT_BOOKINGS:
            return {
                ...state,
                currentBookings: action.payload
            };
        case GET_FAVOURITES:
            return {
                ...state,
                favourites: action.payload
            };
        case GET_RECOMMENDATIONS:
            return {
                ...state,
                recommendations: action.payload
            };
        case GET_BOOKABLE:
            return {
                ...state,
                bookable: action.payload
            };
        case ADD_FAVOURITE:
            return {
                ...state,
                bookable: action.payload,
                //favourite: true,
            };
        case DELETE_FAVOURITE:
            return {
                ...state,
                bookable: action.payload,
              //  favourite: false,
            };
        default:
            return state;
    }
};
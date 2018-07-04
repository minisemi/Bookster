import {
    SET_CURRENT_BOOKINGS,
    SET_FAVOURITES,
    SET_RECOMMENDATIONS,
    SET_BOOKABLE,
    ADD_FAVOURITE,
    DELETE_FAVOURITE,
    SET_COMPANY_BOOKABLES,
    SET_BOOKABLE_EVENTS,
    SET_EVENTS_ERROR,
} from './bookablesActions';

export default (state = {}, action) => {
    switch (action.type) {
        case SET_CURRENT_BOOKINGS:
            return {
                ...state,
                currentBookings: action.payload
            };
        case SET_FAVOURITES:
            return {
                ...state,
                favourites: action.payload
            };
        case SET_RECOMMENDATIONS:
            return {
                ...state,
                recommendations: action.payload
            };
        case SET_BOOKABLE:
            return {
                ...state,
                bookable: action.payload
            };
        case ADD_FAVOURITE:
            return {
                ...state,
                bookable: action.payload,
            };
        case DELETE_FAVOURITE:
            return {
                ...state,
                bookable: action.payload,
            };
        case SET_COMPANY_BOOKABLES:
            return {
                ...state,
                companyBookables: action.payload,
            };
        case SET_BOOKABLE_EVENTS:
            return {
                ...state,
                bookableEvents: action.payload,
            };
        case SET_EVENTS_ERROR:
            return {
                ...state,
                eventsErrorMessage: action.payload,
            };
        default:
            return state;
    }
};
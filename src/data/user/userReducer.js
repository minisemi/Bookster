import {
    GET_CURRENT_BOOKINGS
} from './userActions';

const INITIAL_STATE = {

};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_CURRENT_BOOKINGS:
            return {
                ...state,
                currentBookings: action.payload
            };
        default:
            return state;
    }
};
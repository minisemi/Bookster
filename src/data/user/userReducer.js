import {
    SIGN_UP_USER,
    LOG_IN_USER,
    CHANGE_PASSWORD,
} from './userActions';

const INITIAL_STATE = {

};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_UP_USER:
            return {
                ...state,
                currentBookings: action.payload
            };
        case LOG_IN_USER:
            return {
                ...state,
                currentBookings: action.payload
            };
        case CHANGE_PASSWORD:
            return {
                ...state,
                currentBookings: action.payload
            };
        default:
            return state;
    }
};
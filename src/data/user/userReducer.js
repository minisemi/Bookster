import {
    LOG_OUT_USER,
    CHANGE_PASSWORD,
    SET_USER,
} from './userActions';
import Auth from '../../Auth';

const INITIAL_STATE = {
    user: Auth.getUser()
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOG_OUT_USER:
            return {
                ...state,
                user: {}
            };
        case CHANGE_PASSWORD:
            return {
                ...state,
                currentBookings: action.payload
            };
        case SET_USER:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
};
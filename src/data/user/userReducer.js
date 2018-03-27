import {
    LOG_IN_USER,
    LOG_OUT_USER,
    CHANGE_PASSWORD,
} from './userActions';
import Auth from '../../Auth';

const INITIAL_STATE = {
    user: Auth.getUser()
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOG_IN_USER:
            console.log("action.payload");
            console.log(action.payload);
            return {
                ...state,
                user: action.payload
            };
        case LOG_OUT_USER:
            return {
                ...state,
                user: undefined
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
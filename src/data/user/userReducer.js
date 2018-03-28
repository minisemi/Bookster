import {
    LOG_OUT_USER,
    SET_USER,
    SET_USER_INFO_MESSAGE,
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
        case SET_USER:
            return {
                ...state,
                user: action.payload
            };
        case SET_USER_INFO_MESSAGE:
            return {
                ...state,
                userInfoMessage: action.payload
            };
        default:
            return state;
    }
};
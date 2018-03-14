import {
    GET_COMPANY,
} from './companyActions';

const INITIAL_STATE = {

};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_COMPANY:
            return {
                ...state,
                company: action.payload
            };
        default:
            return state;
    }
};
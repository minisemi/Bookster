import {
    GET_COMPANY,
} from './companyActions';

export default (state = {}, action) => {
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
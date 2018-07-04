import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form';
import { bookablesReducer } from '../data/bookables';
import { companyReducer } from '../data/company';
import { userReducer } from '../data/user';
import { searchReducer } from '../data/search';

export default combineReducers({
    bookables: bookablesReducer,
    company: companyReducer,
    user: userReducer,
    search: searchReducer,
    form: formReducer, // <-- redux-form
    router: routerReducer,
});

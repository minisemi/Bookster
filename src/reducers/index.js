import { combineReducers } from 'redux';
import { bookablesReducer } from '../data/bookables';
import { companyReducer } from '../data/company';
import { userReducer } from '../data/user';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  bookables: bookablesReducer,
  company: companyReducer,
  user: userReducer,
  form: formReducer // <-- redux-form
});

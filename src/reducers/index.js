import { combineReducers } from 'redux';
import { bookablesReducer } from '../data/bookables';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  bookables: bookablesReducer,
  form: formReducer // <-- redux-form
});

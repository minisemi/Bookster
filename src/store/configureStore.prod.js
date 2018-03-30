import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import rootReducer from '../reducers';

// Middleware you want to use in production:
const history = createHistory();
const middlewareRouter = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, middlewareRouter);

export default function configureStore(initialState) {

  // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  return createStore(rootReducer, initialState, enhancer);
};
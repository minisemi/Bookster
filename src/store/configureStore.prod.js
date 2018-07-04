import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './reducers';


export default function configureStore(initialState, history) {
const middlewareRouter = routerMiddleware(history);
// Middleware you want to use in production:
const enhancer = applyMiddleware(thunk, middlewareRouter);

  // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  return createStore(rootReducer, initialState, enhancer);
};
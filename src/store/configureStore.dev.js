import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
//import createHistory from 'history/createBrowserHistory';
//import {  browserHistory } from 'react-router';
import reducer from '../reducers';


export default function configureStore(initialState, history) {
  //const history = createHistory();
  const middlewareRouter = routerMiddleware(history);
    const finalCreateStore = compose(
        applyMiddleware(thunk, middlewareRouter),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )(createStore);

    const store = finalCreateStore(reducer, initialState);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers');
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}
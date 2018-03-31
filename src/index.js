import React from 'react';
import ReactDOM  from 'react-dom';
import Popup from 'react-popup';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import './static/index.css';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router'
import Layout from './containers/LayoutContainer'
const history = createHistory();
const store = configureStore({}, history);

// BYT UT CONNECTEDROUTER MOT BROWSERROUTER OCH KÖR SÅLEDES UTAN REACT-ROUTER-REDUX
ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter  history={history} onUpdate={() => window.scrollTo(0, 0)}>
            <Route path="/" component={Layout}/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

ReactDOM.render(
    <Popup
        className="mm-popup"
        btnClass="mm-popup__btn"
        closeBtn={true}
        closeHtml={null}
        defaultOk="Ok"
        defaultCancel="Cancel"
        wildClasses={false}/>,
    document.getElementById('popupContainer')
);
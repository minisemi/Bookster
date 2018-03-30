import React from 'react';
import ReactDOM  from 'react-dom';
import Popup from 'react-popup';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import './static/index.css';
import AppRoutes from './components/layout/AppRoutes'
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
import routes from './routes';
const history = createHistory();

/*const Root = () => {
    return (
        <ConnectedRouter  history={history} routes={routes} onUpdate={() => window.scrollTo(0, 0)}/>
    )
};*/
const store = configureStore({}, history);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter  history={history} onUpdate={() => window.scrollTo(0, 0)}>
            {routes}
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
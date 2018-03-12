import React from 'react';
import { render } from 'react-dom';
import Popup from 'react-popup';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import './static/index.css';
import AppRoutes from './components/layout/AppRoutes'

const Root = () => {
    return (
        <AppRoutes/>
    )
};

const store = configureStore();

render(
    <Provider store={store}>
        <Root />
    </Provider>,
    document.getElementById('root')
);

render(
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
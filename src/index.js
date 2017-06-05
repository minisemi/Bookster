import React from 'react';
import ReactDOM from 'react-dom';
import Popup from 'react-popup';
import './static/index.css';
import AppRoutes from './components/layout/AppRoutes'

const Root = () => {
    return (
        <AppRoutes/>
    )
}
//DONT'T KNOW IF WINDOW.ONLOAD IS NEEDED. SEEMS TO WORK WITHOUT IT TOO
window.onload = () => {
    ReactDOM.render(
        <Root />,
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
    );}
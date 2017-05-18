import React from 'react';
import ReactDOM from 'react-dom';
import Popup from 'react-popup';
import './static/index.css';
import AppRoutes from './components/AppRoutes'



//import createBrowserHistory from 'history/createBrowserHistory'

//const newHistory = createBrowserHistory();

const Root = () => {
    return (
        <AppRoutes/>


        /*<Router history={newHistory} onUpdate={() => window.scrollTo(0, 0)}>
            <Route path="/" component={Layout}>
            <IndexRoute component={LogIn}/>
            <Route path="/special" component={App}/>
            <Route path="booking/:id" component={Booking}/>
                <Route path="*" component={NotFoundPage}/>
            </Route>
        </Router>*/

    )
}
//VET INTE OM DENNA WINDOW.ONLOAD BEHÖVS. TA BORT OM PROBLEM UPPSTÅR
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
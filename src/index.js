import React from 'react';
import ReactDOM from 'react-dom';
import SearchBox from './components/SearchBox';
import App from './components/App';
import Nav from './components/Nav';
import LogIn from './components/LogIn';
import Booking from './components/BookingPage';
import Layout from './components/Layout'
import NotFoundPage from './components/NotFoundPage'
import './static/index.css';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import AppRoutes from './components/AppRoutes'




import createBrowserHistory from 'history/createBrowserHistory'

const newHistory = createBrowserHistory();

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

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
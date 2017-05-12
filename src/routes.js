import React from 'react'
import { Route, IndexRoute, browserHistory } from 'react-router'
import App from './components/App';
import LogIn from './components/loginPage/LogIn';
import BookingPage from './components/BookingPage';
import Layout from './components/Layout'
import CompanyPage from './components/CompanyPage';
import NotFoundPage from './components/NotFoundPage';
import Auth from './Auth';

var checkAuth = function(location, callback, component){
    if (Auth.checkIfAuthenticated()) {
        callback(null, component);
    } else {
        callback(null, LogIn);
    }
}

const routes = (
    <Route path="/" component={Layout}>
        <IndexRoute getComponent={(location, callback) => {
            checkAuth(location, callback, App)
        }
        }/>
        <Route path="/sign_in" component={LogIn}/>
        <Route path="/:id" getComponent={(location, callback) => {
            checkAuth(location, callback, CompanyPage)
        }
        }/>
        <Route path="/:compId/:id" getComponent={(location, callback) => {
            checkAuth(location, callback, BookingPage)
        }
        }/>
        <Route path="*" getComponent={(location, callback) => {
            checkAuth(location, callback, NotFoundPage)
        }
        }/>
    </Route>
);

export default routes
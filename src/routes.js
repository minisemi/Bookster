import React from 'react'
import { Route, IndexRoute, browserHistory } from 'react-router'
import App from './components/App';
import LogIn from './components/loginPage/LogIn';
import BookingPage from './components/BookingPage';
import Layout from './components/Layout'
import CompanyPage from './components/CompanyPage';
import NotFoundPage from './components/NotFoundPage';
import ProfilePage from './components/profilePage/ProfilePage'
import Auth from './Auth';




var checkAuth = function(location, callback, component){
    if (Auth.checkIfAuthenticated()) {
        if (component == App){
             history.replaceState(null, null, "/")
        }
        callback(null, component);
    } else {
        history.replaceState( null, null, "sign_in");
        callback(null, LogIn);
    }
}

const routes = (
    <Route path="/" component={Layout}>
        <IndexRoute getComponent={(location, callback) => {
            checkAuth(location, callback, App)
        }
        }/>
        <Route path="/sign_in" getComponent={(location, callback) => {
            checkAuth(location, callback, App)
        }
        }/>

        <Route path="/profile" getComponent={(location, callback) => {
            checkAuth(location, callback, ProfilePage)
        }
        }/>
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
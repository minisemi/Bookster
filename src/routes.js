import React from 'react'
import { Route, IndexRoute } from 'react-router'
import HomePageContainer from './containers/HomePageContainer';
import LogIn from './components/loginPage/LogIn';
import BookablePageContainer from './containers/BookablePageContainer';
import Layout from './components/layout/Layout'
import CompanyPage from './components/companyPage/CompanyPage';
import NotFoundPage from './components/layout/NotFoundPage';
import ProfilePage from './components/profilePage/ProfilePage'
import Auth from './Auth';

let checkAuth = function(location, callback, component){
    if (Auth.checkIfAuthenticated()) {
        if (component === HomePageContainer){
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
            checkAuth(location, callback, HomePageContainer)
        }
        }/>
        <Route path="/sign_in" getComponent={(location, callback) => {
            checkAuth(location, callback, HomePageContainer)
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
            checkAuth(location, callback, BookablePageContainer)
        }
        }/>
        <Route path="*" getComponent={(location, callback) => {
            checkAuth(location, callback, NotFoundPage)
        }
        }/>
    </Route>
);

export default routes
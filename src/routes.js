import React from 'react'
import { Route, IndexRoute } from 'react-router'
import HomePageContainer from './containers/HomePageContainer';
import LoginPage from './components/loginPage/LoginPage';
import BookablePageContainer from './containers/BookablePageContainer';
import Layout from './components/layout/Layout'
import CompanyPageContainer from './containers/CompanyPageContainer';
import NotFoundPage from './components/layout/NotFoundPage';
import ProfilePage from './containers/ProfilePageContainer'
import Auth from './Auth';
import Store from './store/configureStore.dev';

let checkAuth = function(location, callback, component){
    console.log("routes");
    console.log(Store.getState());
    if (Auth.checkIfAuthenticated()) {
        if (component === HomePageContainer){
            history.replaceState(null, null, "/")
        }
        callback(null, component);
    } else {
        history.replaceState( null, null, "sign_in");
        callback(null, LoginPage);
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
            checkAuth(location, callback, CompanyPageContainer)
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
import React from 'react'
import { Route } from 'react-router'


import Layout from './containers/LayoutContainer'

import Auth from './Auth';
import Store from './store/configureStore.dev';

/*let checkAuth = function(location, callback, component){
    console.log("routess");
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
}*/

const routes = (
    <Route path="/" component={Layout}/>

);

export default routes
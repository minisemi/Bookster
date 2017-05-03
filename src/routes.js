import React from 'react'
import ReactDom from 'react-dom';
import { Route, IndexRoute } from 'react-router'
import App from './components/App';
import LogIn from './components/loginPage/LogIn';
import BookingPage from './components/BookingPage';
import Layout from './components/Layout'
import CompanyPage from './components/CompanyPage';
import NotFoundPage from './components/NotFoundPage';

const routes = (
  <Route path="/" component={Layout}>
            <IndexRoute component={LogIn}/>
            <Route path="/special" component={App}/>
            <Route path="/company/:id" component={CompanyPage}/>
            <Route path="/company/booking/:id" component={BookingPage}/>
                <Route path="*" component={NotFoundPage}/>
            </Route>
);

export default routes
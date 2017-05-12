import React from 'react';
import ReactDOM from 'react-dom';
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

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
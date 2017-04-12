import React from 'react';
import ReactDOM from 'react-dom';
import SearchBox from './components/SearchBox';
import App from './components/App';
import Nav from './components/Nav';
import LogIn from './components/LogIn'
import './index.css';
import { Router, Route, browserHistory } from 'react-router';




import createBrowserHistory from 'history/createBrowserHistory'

const newHistory = createBrowserHistory();

const Root = () => {
  return (

      <Router history={newHistory}>
          <div>
        <Route path="/" component={LogIn}/>
        <Route path="/special" component={App}/>
          </div>
      </Router>

  )
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
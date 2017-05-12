import React from 'react';
import { Router, browserHistory } from 'react-router';
import routes from '../routes';
import Auth from '../Auth'


/*let pathStack = [];
browserHistory.listen(function(ev) {

  if (ev.pathname=='/' && pathStack[0]!='/' && Auth.checkIfAuthenticated()){
    browserHistory.push('/special');
    pathStack = [];
  }
  pathStack.unshift(ev.pathname)
  console.log('Stack: ', pathStack)
});
*/
export default class AppRoutes extends React.Component {



  render() {
    return (
      <Router history={browserHistory} routes={routes} onUpdate={() => window.scrollTo(0, 0)}/>
    );
  }
}
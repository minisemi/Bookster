import React, { Component } from 'react';
import { Link } from 'react-router';
import '../static/Nav.css';
import LogInForm from './loginPage/LogInForm';
import BookingsSearch from './BookingsSearch';
import Auth from '../Auth'
import {browserHistory} from 'react-router';

export default class Nav extends Component {

  constructor() {
    super()
      console.log("cookie token ="+Auth.getToken())
      if (Auth.getToken() == "unauthorized"){
        this.state = { loggedIn: false};
    } else {
        this.state = { loggedIn: true};
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  //TODO: fixa så detta funkar med tokens i cookie
  handleLogin(token){
      Auth.authenticateUser(token)
      browserHistory.push('/special');
    this.setState({loggedIn:true});
      }

    handleLogout(){
        Auth.deauthenticateUser()
        this.setState({loggedIn:false});
    }

  render() {
    let bookingsSearchClass, loginFormClass;
    // Borde egentligen skapa elementen om man loggas in, istället för att dölja dem (säkerhet osv)
    if (!this.state.loggedIn){
      bookingsSearchClass="noDisplay"
        loginFormClass="formDisplay"
    }else {
      bookingsSearchClass="searchDisplay"
        loginFormClass="noDisplay"
    }

    return (

        <div>
            <header >
                <div onClick={this.handleLogout}>
              <Link to={"/"} >
                <div className="navbar-header">
                  <h1>Bookster</h1>
                </div>
              </Link>
                </div>
              <div className={bookingsSearchClass}>
              <BookingsSearch  />
              </div>
                <div onClick={this.handleLogout} className={bookingsSearchClass}>
              <Link className="btn btn-danger" role="button" to={"/"} > Log out
              </Link>
                </div>

                <ul className={`nav navbar-nav navbar-right ${loginFormClass}`}>
                  <LogInForm handleLogin={this.handleLogin} className="booksterHeaderDisplay"/>
                </ul>
            </header>
        </div>

    );
  }
}


import React, { Component } from 'react';
import { Link } from 'react-router';
import '../static/Nav.css';
import LogInForm from './loginPage/LogInForm';
import {Row, Col} from 'react-bootstrap';
import BookingsSearch from './BookingsSearch';

function logout() {
    sessionStorage.removeItem("token")
        sessionStorage.removeItem("email")
}

export default class Nav extends Component {

  constructor() {
    super()
    this.state = { loggedIn: []};
  }


  render() {
    const { loggedIn }  = this.state;
    var bookingsSearchClass, loginFormClass;
    // Borde egentligen skapa elementen om man loggas in, istället för att dölja dem (säkerhet osv)
    if (sessionStorage.token == undefined){
      bookingsSearchClass="searchNoDisplay"
        loginFormClass="formDisplay"
    }else {
      bookingsSearchClass="searchDisplay"
        loginFormClass="formNoDisplay"
    }
    return (

        <div>
            <header >
              <Link to={"/"} onClick={logout()}>
                <div className="navbar-header">
                  <h1>Bookster</h1>
                </div>
              </Link>
              <div className={bookingsSearchClass}>
              <BookingsSearch id="bookingsSearch" />
              </div>
                <ul className={`nav navbar-nav navbar-right ${loginFormClass}`}>
                  <LogInForm id="logInForm" className="booksterHeaderDisplay"/>
                </ul>
            </header>


        </div>

    );
  }
}


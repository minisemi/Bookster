import React, { Component } from 'react';
import { Link } from 'react-router';
import '../static/Nav.css';
import LogInForm from './loginPage/LogInForm';
import {Row, Col} from 'react-bootstrap';
import BookingsSearch from './BookingsSearch';

export default class Nav extends Component {

  constructor() {
    super()
      console.log("sesstionstorage.token="+sessionStorage.token)
      if (sessionStorage.token == undefined){
        this.state = { loggedIn: false};
    } else {
        this.state = { loggedIn: true};
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin(){
      this.updateSessionStorage("token","email")
    this.setState({loggedIn:true});
      }

  handleLogout(){
      this.logout();
    this.setState({loggedIn:false});
      }

      updateSessionStorage(token, email){

    if (typeof(Storage) !== "undefined") {
        sessionStorage.setItem("token", token)
        sessionStorage.setItem("email", email)
    } else {
        alert("Browser doesn't support web storage")
    }


}

 logout(){
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("email")
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
                <ul className={`nav navbar-nav navbar-right ${loginFormClass}`}>
                  <LogInForm handleLogin={this.handleLogin} className="booksterHeaderDisplay"/>
                </ul>
            </header>
        </div>

    );
  }
}


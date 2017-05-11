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
  }

  handleLogin(){
    console.log("handleLogin(): set state loggedIn=true")
      this.updateSessionStorage("token","email")
    this.setState({loggedIn:true});
      }

  handleLogout(){
    console.log("handleLogout(): set state loggedIn=false")
      this.logout();
    this.setState({loggedIn:false});
      }

      updateSessionStorage(token, email){
            console.log("add token")

    if (typeof(Storage) !== "undefined") {
        sessionStorage.setItem("token", token)
        sessionStorage.setItem("email", email)
    } else {
        alert("Browser doesn't support web storage")
    }


}

 logout(){
        console.log("remove token")
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("email")
}

  render() {
    let bookingsSearchClass, loginFormClass;
    console.log("Nav render. State="+this.state.loggedIn)
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
              <Link to={"/"} onClick={this.handleLogout}>
                <div className="navbar-header">
                  <h1>Bookster</h1>
                </div>
              </Link>
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


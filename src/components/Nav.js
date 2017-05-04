import React, { Component } from 'react';
import { Link } from 'react-router';
import '../static/Nav.css';
import LogInForm from './loginPage/LogInForm';
import {Row, Col} from 'react-bootstrap';
import BookingsSearch from './BookingsSearch';


class Nav extends Component {

  render() {
    return (

        <div >
            <header>
              <Link to={"/"}>
                <div className="navbar-header">
                  <h1>Bookster</h1>
                </div>
              </Link>
              <BookingsSearch/>
                <ul className="nav navbar-nav navbar-right">
                  <LogInForm/>
                </ul>
            </header>


        </div>

    );
  }
}

export default Nav;
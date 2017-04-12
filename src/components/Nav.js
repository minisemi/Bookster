import React, { Component } from 'react';
import { Link } from 'react-router';
import '../App.css';

class Nav extends Component {

  render() {
    return (
 <nav className="navbar navbar-default">
      <div className="App">
        <div className="App-header">
            <div className="navbar-header">
          <h2>BOOKSTER</h2>
        </div>
            <ul className="nav navbar-nav navbar-right">

          <li><button className="btn btn-info log">Profile</button></li>
          <li><button className="btn btn-danger log">Log out </button></li>
        </ul>
        </div>

      </div>
        </nav>

    );
  }
}

export default Nav;
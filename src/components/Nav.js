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

        //TODO: ANVÄND FÖLJANDE NAVBAR ISTÄLLET, EFTERSOM DET ÄR REACT-BOOTRSTRAP
        /*
        <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">React-Bootstrap</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavItem eventKey={1} href="#">Link</NavItem>
      <NavItem eventKey={2} href="#">Link</NavItem>
      <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
        <MenuItem eventKey={3.1}>Action</MenuItem>
        <MenuItem eventKey={3.2}>Another action</MenuItem>
        <MenuItem eventKey={3.3}>Something else here</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={3.4}>Separated link</MenuItem>
      </NavDropdown>
    </Nav>
  </Navbar>*/

    );
  }
}

export default Nav;
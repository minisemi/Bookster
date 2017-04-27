import React, { Component } from 'react';
import { Link } from 'react-router';
import '../static/Nav.css';
import LogInForm from './loginPage/LogInForm';
import {Row, Col} from 'react-bootstrap';


class Nav extends Component {

  render() {
    return (

        <div >
          <Row>
            <header>
              <Col xs={12} sm={12} md={3} lg={2}>
                <div className="navbar-header">
                  <h1>Bookster</h1>
                </div></Col>
              <Col xs={12} sm={12} mdOffset={2} md={7} lgOffset={3} lg={7}>
                <ul className="nav navbar-nav navbar-right">
                  <LogInForm/>
                </ul>
              </Col>
            </header>

          </Row>

        </div>




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
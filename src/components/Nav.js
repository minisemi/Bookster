import React, { Component } from 'react';
import { Link } from 'react-router';
import '../static/Nav.css';
import LogInForm from './loginPage/LogInForm';
import {Row, Col} from 'react-bootstrap';


class Nav extends Component {

  render() {
    return (

        <div >
          <Row className="noMargin">
            <header>
              <Link to={"/"}>
                <Col xs={12} sm={12} md={3} lg={2}>
                <div className="navbar-header">
                  <h1>Bookster</h1>
                </div>
                </Col>
              </Link>
              <Col xs={12} sm={12} mdOffset={1} md={8} lgOffset={3} lg={7}>
                <ul className="nav navbar-nav navbar-right">
                  <LogInForm/>
                </ul>
              </Col>
            </header>

          </Row>

        </div>

    );
  }
}

export default Nav;
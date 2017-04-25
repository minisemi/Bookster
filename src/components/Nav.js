import React, { Component } from 'react';
import { Link } from 'react-router';
import '../static/Nav.css';
import {Grid, Row, Col, Form, FormGroup, ControlLabel, Button, FormControl} from 'react-bootstrap';


class Nav extends Component {

  render() {
    return (

      <div >
<Row>
        <div className="App-header">
          <Col xs={12} sm={12} md={3} lg={2}>
            <div className="navbar-header">
          <h2>BOOKSTER</h2>
            </div></Col>
          <Col xs={12} sm={12} mdOffset={2} md={7} lgOffset={3} lg={7}>
            <ul className="nav navbar-nav navbar-right">
              <Form inline>
                <FormGroup controlId="formInlineEmail">
                  <ControlLabel>Email: </ControlLabel>
                    {' '}
                    <FormControl type="email" placeholder="Enter your email" />
                </FormGroup>
                  {' '}
                  <FormGroup controlId="formInlinePassword">
                    <ControlLabel>Password: </ControlLabel>
                      {' '}
                      <FormControl type="password" />
                  </FormGroup>
                  {' '}
                  <Link to="/special" className="btn btn-info log" role="button"> Log in </Link>
              </Form>
        </ul>
          </Col>
        </div>

</Row>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6}>
            Heres a pretty pic
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
        <Form horizontal>
          <FormGroup controlId="formHorizontalName">
            <Col sm={6}>
              <FormControl type="firstName" placeholder="First name" />
            </Col>
            <Col sm={6}>
              <FormControl type="SurName" placeholder="Sur name" />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalEmail">
            <Col sm={12}>
              <FormControl type="email" placeholder="Email" />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalPassword">
            <Col sm={12}>
              <FormControl type="password" placeholder="Password" />
            </Col>
          </FormGroup>
          <FormGroup controlId="">

            <Col smOffset={2} sm={10}>
              <Button type="submit">
                Create account
              </Button>
            </Col>
          </FormGroup>
        </Form>
          </Col>
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
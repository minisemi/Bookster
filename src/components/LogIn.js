import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import {Grid, Row, Col} from 'react-bootstrap';


export default class LogIn extends Component {

  render() {

    return (
      <Grid>
          <Row>
              <Col xs={12} md={12}>
        <Nav />
          </Col>
          </Row>

        <Row>
        <Col xs={12} md={12}>
          <div className="jumbotron text-center">
            <h2>Welcome</h2>
              <ul>

          </ul>
              <button className="btn btn-info log">Log In</button>

          </div>
        </Col>
        </Row>

      </Grid>
    );
  }
}


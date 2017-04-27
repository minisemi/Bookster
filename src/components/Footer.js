import React, { Component } from 'react';
import { Link } from 'react-router';
import '../static/Footer.css';
import {Grid, Row, Col, Form, FormGroup, ControlLabel, Button, FormControl} from 'react-bootstrap';


class Footer extends Component {

  render() {
    return (


      <footer >
          <Col  xs={3} smOffset={1} sm={3} mdOffset={1} md={3} lgOffset={1} lg={3}>
            <div>
          <h2 className="header">Bookster</h2>
            </div></Col>
          <Col xsOffset={2} xs={3} smOffset={2} sm={3} mdOffset={2} md={3} lgOffset={1} lg={3} className="contactInfo">

              <row>
                  <p className="contactInfo topRow"><b>Contact information</b></p>
              </row>
              <row>
                  <p className="contactInfo">Email: info@bookster.se</p>
              </row>
              <row>
                  <p className="contactInfo">Address: Studievägen 9B lgh 922070</p>
              </row>
          </Col>
        </footer>

    );
  }
}

export default Footer;
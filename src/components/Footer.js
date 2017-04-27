import React, { Component } from 'react';
import { Link } from 'react-router';
import '../static/Footer.css';
import {Grid, Row, Col, Form, FormGroup, ControlLabel, Button, FormControl} from 'react-bootstrap';


class Footer extends Component {

  render() {
    return (


      <footer >
          <Col xs={12} sm={12} md={3} lg={2}>
            <div>
          <h2 className="footer-header">Bookster</h2>
            </div></Col>
        </footer>

    );
  }
}

export default Footer;
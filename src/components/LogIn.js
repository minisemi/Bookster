import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import {Grid, Row, Col, Form, FormGroup, ControlLabel, Button, FormControl} from 'react-bootstrap';
import BookingsSlideBar from './BookingsSlidebar';



export default class LogIn extends Component {

  render() {

    return (
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
    );
  }
}


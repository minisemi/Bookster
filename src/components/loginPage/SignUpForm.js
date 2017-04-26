import React, { Component } from 'react';
import {Grid, Row, Col, Form, FormGroup, ControlLabel, Button, FormControl} from 'react-bootstrap';
import  DatePicker  from 'react-bootstrap-date-picker';
import '../../static/SignUpForm.css'


export default class LogIn extends Component {

  render() {

    return (
        <Form className="form" horizontal>
          <FormGroup controlId="formHorizontalName">
            <Col sm={6}>
              <FormControl type="firstName" placeholder="First name" />
            </Col>
            <Col sm={6}>
              <FormControl type="Surname" placeholder="Surname" />
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

            <Col sm={10}>
                <DatePicker  id="example-datepicker" dateFormat="YYYY/MM/DD"/>
            </Col>
          </FormGroup>
          <FormGroup controlId="">

            <Col smOffset={9} sm={3} mdOffset={9} md={3} lgOffset={9} lg={3}>
              <Button type="submit">
                Create account
              </Button>
            </Col>
          </FormGroup>
        </Form>
    );
  }
}

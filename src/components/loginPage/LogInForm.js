
import React, { Component } from 'react';
import { Link } from 'react-router';
import {Grid, Row, Col, Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

function updateSessionStorage(token, email){
    if (typeof(Storage) !== "undefined") {
        sessionStorage.setItem("token", token)
        sessionStorage.setItem("email", email)
        sessionStorage.setItem("currentTab", "homeTab")
    } else {
        alert("Browser doesn't support web storage")
    }
}

export default class LogInForm extends Component {



    render() {
        return (
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
                <Link to="/special" className="btn btn-info log" role="button" > Log in </Link>
            </Form>
        );
    }
}
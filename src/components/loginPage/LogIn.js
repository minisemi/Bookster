import React, { Component } from 'react';
import CarouselShower from './CarouselShower';
import SignUpForm from './SignUpForm'
import {Row, Col} from 'react-bootstrap';
import '../../static/Login.css'



export default class LogIn extends Component {

    render() {

        return (
            <Row className="loginPositioning">
                <Col xs={12} sm={12} md={6} lg={6}>
                    <CarouselShower/>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6}>
                    <SignUpForm/>
                </Col>
            </Row>
        );
    }
}


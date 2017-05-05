import React, { Component } from 'react';
import {Grid, Row, Col, Form, FormGroup, ControlLabel, Button, FormControl} from 'react-bootstrap';
import  DatePicker  from 'react-bootstrap-date-picker';
import '../../static/SignUpForm.css'


export default class SignUpForm extends Component {
    handleFormSubmit(formProps) {
        //this.props.registerUser(formProps);
        formProps.preventDefault();
        console.log();
    }
    render() {
        const { handleSubmit } = this.props;
        return (
            <Form className="form" horizontal onSubmit={this.handleFormSubmit.bind(this)}>
                <FormGroup controlId="formHorizontalName">
                    <Col sm={6}>
                        <FormControl type="firstName" placeholder="First name"  required={true}/>
                    </Col>
                    <Col sm={6}>
                        <FormControl type="Surname" placeholder="Surname" required={true}/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalEmail">
                    <Col sm={12}>
                        <FormControl type="email" placeholder="Email" required={true}/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalPassword">
                    <Col sm={12}>
                        <FormControl type="password" placeholder="Password" required={true} minLength={5}/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalPassword">
                    <Col sm={12}>
                        <FormControl type="password" placeholder="Repeat password" required={true} minLength={5}/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="">

                    <Col sm={10}>
                        <DatePicker  id="example-datepicker" dateFormat="YYYY/MM/DD" required={true}/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="">

                    <Col smOffset={9} sm={3} mdOffset={9} md={3} lgOffset={9} lg={3}>
                        <Button type="submit" >
                            Create account
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

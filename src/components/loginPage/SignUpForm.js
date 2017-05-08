import React, { Component } from 'react';
import {Grid, Row, Col, Form, FormGroup, ControlLabel, Button, FormControl} from 'react-bootstrap';
import  DatePicker  from 'react-bootstrap-date-picker';
import '../../static/SignUpForm.css'
import { signUpUser } from '../../utils/auth-api';


export default class SignUpForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            formValues: {}
        }
    }

    handleChange(event){
        event.preventDefault();
        let formValues = this.state.formValues;
        let name = event.target.name;
        let value = event.target.value;

        formValues[name] = value;

        this.setState({formValues})
        console.log("onchange: "+ formValues.password);
    }
    handleSubmit(event) {
        event.preventDefault();
        console.log(`Formvärden: ${this.state.formValues}`);
        signUpUser(this.state.formValues);
    }

    render() {
        return (
            <Form className="form" horizontal onSubmit={ this.handleSubmit.bind(this)}>
                <FormGroup controlId="formHorizontalName">
                    <Col sm={6}>
                        <FormControl type="firstName" name="firstName" placeholder="First name"  required={true} value={this.state.formValues["firstName"]} onChange={this.handleChange.bind(this)}/>
                    </Col>
                    <Col sm={6}>
                        <FormControl type="surName" name="surName" placeholder="Surname" value={this.state.formValues["surName"]} onChange={this.handleChange.bind(this)} required={true}/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalEmail">
                    <Col sm={12}>
                        <FormControl type="email" name="email" placeholder="Email" required={true} value={this.state.formValues["email"]} onChange={this.handleChange.bind(this)}/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalPassword">
                    <Col sm={12}>
                        <FormControl type="password" name="password" placeholder="Password" required={true} minLength={5} value={this.state.formValues["password"]} onChange={this.handleChange.bind(this)}/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalPassword">
                    <Col sm={12}>
                        <FormControl type="password" name="repeatPassword" placeholder="Repeat password" required={true} minLength={5} value={this.state.formValues["repeatPassword"]} onChange={this.handleChange.bind(this)}/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="date">
                    <Col sm={10}>
                        <FormControl type="date" name="birth" placeholder="Birth (YYYY/MM/DD)" required={true} value={this.state.formValues["birth"]} onChange={this.handleChange.bind(this)}/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="">

                    <Col smOffset={9} sm={3} mdOffset={9} md={3} lgOffset={9} lg={3}>
                        <Button type="submit" value="Submit" >
                            Create account
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

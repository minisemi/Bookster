import React, { Component } from 'react';
import {Row, Col, Form, FormGroup, Button, FormControl, Alert} from 'react-bootstrap';
import '../../static/SignUpForm.css'
import Validation from '../../Validation'
import { signUpUser } from '../../utils/auth-api';
var timeout= null;

export default class SignUpForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            formValues: {},
            formValidation:{},
            message: "",
            visibility:"hiddenAlert",
            buttonEnabled:true
        }
    }

    handleChange(event){
        event.preventDefault();
        let formValues = this.state.formValues;
        let name = event.target.name;
        let value = event.target.value;
        formValues[name] = value;
        this.setState({formValues}, "")
    }

    instantCheck(event){
        event.persist();
        this.handleChange(event);
        clearTimeout(timeout);
        timeout = setTimeout(Validation.feedback, 500,this, event);
    }

    handler(e) {
        e.preventDefault()
        this.setState({
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        signUpUser(this.state.formValues).then((message) => {
            var vis = "";
            if (message==="Signed up!") {
                Validation.clearVals(this.state.formValidation)
                vis="alert-success"
            }else{
                vis="alert-danger"
                if (message==="User already exists") {
                    let formVal = this.state.formValidation
                    formVal["email"]= "error";
                }
            }
            this.setState({visibility: vis, message: message});
        });
    }

    render() {
        return (
            <div>
                <Form className="form" horizontal onSubmit={ this.handleSubmit.bind(this)}>
                    <FormGroup>
                        <Col sm={6}>
                            <FormControl id="formHorizontalFirstName" type="firstName" name="firstName" placeholder="First name"  required={true} value={this.state.formValues["firstName"] || ""} onChange={this.handleChange.bind(this)}/><FormControl.Feedback />
                        </Col>
                        <Col sm={6}>
                            <FormControl id="formHorizontalSurName" type="surName" name="surName" placeholder="Surname" value={this.state.formValues["surName"] || ""} onChange={this.handleChange.bind(this)} required={true}/><FormControl.Feedback />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalEmail" validationState={this.state.formValidation.email}>
                        <Col sm={12}>
                            <FormControl type="email" name="email" placeholder="Email" required={true} value={this.state.formValues["email"] || ""} onChange={this.instantCheck.bind(this)}/><FormControl.Feedback />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalPassword" validationState={this.state.formValidation.password}>
                        <Col sm={12}>
                            <FormControl type="password" name="password" placeholder="Password" required={true} value={this.state.formValues["password"] || ""} onChange={this.instantCheck.bind(this)}/><FormControl.Feedback />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalRepeatPassword" validationState={this.state.formValidation.repeatPassword}>
                        <Col sm={12}>
                            <FormControl type="password" name="repeatPassword" placeholder="Repeat password" required={true}  value={this.state.formValues["repeatPassword"] || ""} onChange={this.instantCheck.bind(this)}/><FormControl.Feedback />
                        </Col>
                    </FormGroup>
                    <FormGroup validationState={this.state.formValidation.birth}>
                        <Col sm={10}>
                            <FormControl type="text" name="birth" placeholder="Birth (YYYY-MM-DD)" required={true} value={this.state.formValues["birth"] || ""} onChange={this.instantCheck.bind(this)}/><FormControl.Feedback />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="">
                        <Row>
                            <Alert className={`formAlert ${this.state.visibility}`} > {this.state.message}</Alert>
                        </Row>
                        <Row>
                            <Button className="signUpButton" type="submit" value="Submit" disabled={!this.state.buttonEnabled}>
                                Create account
                            </Button>
                        </Row>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

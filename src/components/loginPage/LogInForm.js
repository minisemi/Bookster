
import React, { Component } from 'react';
import {Form, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import Modal from './SignUpModal'
import { logInUser } from '../../utils/auth-api';

export default class LogInForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            formValues: {},
            loggedIn: false,
            formValidation:{},
            visibility:"hiddenAlert",
            showModal:false
        }
    }
    handleChange(event){
        event.preventDefault();
        let formValues = this.state.formValues;
        let name = event.target.name;
        let value = event.target.value;

        formValues[name] = value;

        this.setState({formValues})
    }

    handleSubmit(event) {
        event.preventDefault();
        logInUser(this.state.formValues).then((response) => {
            this.setState({loggedIn:response.success})
            if (response.success){
                this.props.handleLogin(response.token, this.state.formValues.email, response.userId);

            }
            else{
                this.setState({showModal:true})
            }
        });
    }

    handler(e) {
        e.preventDefault()
        this.setState({
            showModal: false
        })
    }


    render() {
        return (
            <div className="loginForm">
            <Form inline onSubmit={ this.handleSubmit.bind(this)}>
                <FormGroup controlId="formInlineEmail">
                    <ControlLabel>Email: </ControlLabel>
                    {' '}
                    <FormControl type="email" name="email" placeholder="Enter your email" value={this.state.formValues["email"]} required={true} onChange={this.handleChange.bind(this)} />
                </FormGroup>
                {' '}
                <FormGroup controlId="formInlinePassword">
                    <ControlLabel>Password: </ControlLabel>
                    {' '}
                    <FormControl type="password" name="password" value={this.state.formValues["password"]} required={true} onChange={this.handleChange.bind(this)}/>
                </FormGroup>
                {' '}
                <Button type="submit" value="Submit">
                    Sign in
                </Button>
                <Modal showBol={this.state.showModal} handler={this.handler.bind(this)} email={this.state.formValues.email}/>

            </Form>
            </div>
        );
    }
}
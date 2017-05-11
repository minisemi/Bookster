
import React, { Component } from 'react';
import {Form, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import { logInUser } from '../../utils/auth-api';
import {browserHistory} from 'react-router';

export default class LogInForm extends Component {
     constructor(props){
        super(props);
        this.state = {
            formValues: {},
            loggedIn: false
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
            this.setState({loggedIn:response})
            if (response){
                this.props.handleLogin();
                browserHistory.push('/special');
            }
        });
    }


    render() {
        return (
            <Form inline onSubmit={ this.handleSubmit.bind(this)}>
                <FormGroup controlId="formInlineEmail">
                    <ControlLabel>Email: </ControlLabel>
                    {' '}
                    <FormControl type="email" name="email" placeholder="Enter your email" value={this.state.formValues["email"]} onChange={this.handleChange.bind(this)} />
                </FormGroup>
                {' '}
                <FormGroup controlId="formInlinePassword">
                    <ControlLabel>Password: </ControlLabel>
                    {' '}
                    <FormControl type="password" name="password" value={this.state.formValues["password"]} onChange={this.handleChange.bind(this)}/>
                </FormGroup>
                {' '}
                 <Button type="submit" value="Submit" >
                                Sign in
                            </Button>
            </Form>
        );
    }
}
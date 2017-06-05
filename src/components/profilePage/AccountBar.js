/**
 * Created by Matilda on 2017-05-17.
 */
import React, { Component } from 'react';
import { Row, Panel, Form, FormControl, Button, FormGroup, Alert} from 'react-bootstrap';
import '../../static/ProfilePage.css'
import Auth from '../../Auth'
import Validation from '../../Validation'
import {changePassword} from '../../utils/auth-api'

var timeout = null;

export default class AccountBar extends Component {
    constructor (){
        super()
        this.state={formValues:
            {
                oldPassword: "",
                password: "",
                repeatPassword:""},
            formValidation:{
            },
            message:"",
            visibility: "hiddenAlert",
            buttonEnabled:true
        }
        this.handleChange = this.handleChange.bind(this);
        this.instantCheck = this.instantCheck.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event){

        let formValues = this.state.formValues;
        let name = event.target.name;
        let value = event.target.value;

        formValues[name] = value;

        this.setState({formValues, message:this.state.message});



    }

    instantCheck(event){
        event.persist();
        this.handleChange(event);

        clearTimeout(timeout);
        timeout = setTimeout(Validation.feedback, 500,this, event);



    }


    handleSubmit(event) {
        event.preventDefault()

        let password = this.state.formValues.password,
            oldPassword = this.state.formValues.oldPassword,
            formValid = this.state.formValidation;

            changePassword(oldPassword, password, Auth.getToken()).then(response => {
                this.setState({message: response});
                if (this.state.message === "Password successfully changed") {
                    this.setState({visibility: "alert-success"})
                    this.setState(Validation.clearVals(formValid))
                }
                else {
                    this.setState({visibility: "alert-danger"})
                    formValid["oldPassword"] = "error"
                    this.setState(formValid)
                }
            })




    }


    render() {

        return (

            <Panel header="Account Settings" bsStyle="default">
                <Form horizontal onSubmit={ this.handleSubmit.bind(this)}>
                    <FormGroup validationState={this.state.formValidation.oldPassword}>
                        <FormControl required={true} type="password" value={this.state.formValues.oldPassword} name="oldPassword"
                                     placeholder="Old password" onChange={this.handleChange} />
                        <FormControl.Feedback />
                    </FormGroup>
                    <FormGroup validationState={this.state.formValidation.password}>
                        <FormControl type="password" value={this.state.formValues.password} name="password"
                                     placeholder="New password" onChange={this.instantCheck}/>
                        <FormControl.Feedback />
                    </FormGroup>
                    <FormGroup validationState={this.state.formValidation.repeatPassword}>
                        <FormControl type="password" value={this.state.formValues.repeatPassword} name="repeatPassword"
                                     placeholder="Repeat new password" onChange={this.instantCheck}/>
                        <FormControl.Feedback />
                    </FormGroup>
                    <Row>
                        <Alert className={`formAlert ${this.state.visibility}`} > {this.state.message}</Alert>
                    </Row>
                    <Row>
                        <Button disabled={!this.state.buttonEnabled} type="submit" >
                            Change password
                        </Button>
                    </Row>
                </Form>
            </Panel>

        );
    }

}

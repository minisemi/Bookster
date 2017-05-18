/**
 * Created by Matilda on 2017-05-17.
 */
import React, { Component } from 'react';
import { Panel, Form, FormControl, Button, FormGroup} from 'react-bootstrap';
import '../../static/ProfilePage.css'
import Auth from '../../Auth'
import Validation from '../../Validation'
import {checkPassword} from '../../utils/auth-api'


export default class AccountBar extends Component {
    constructor (){
        super()
        this.state={formValues:
            {
            oldPassword: "",
            newPassword: "",
            repeatPassword:""},
            message:""
        }
    }

    handleChange(event){
        event.preventDefault();
        let formValues = this.state.formValues;
        let name = event.target.name;
        let value = event.target.value;

        formValues[name] = value;

        this.setState({formValues}, this.state.message)

    }



    handleSubmit(){
        let newPassword = this.state.formValues.newPassword,
            oldPassword = this.state.formValues.oldPassword,
            repeatPassword = this.state.formValues.repeatPassword;

        if(!checkPassword(oldPassword, Auth.getToken())){
            this.state["message"]= "Wrong password"
            return
        }
        if (newPassword!=repeatPassword){
            this.state["message"]= "Repeated password does not match"
        }
        if (!Validation.CheckPassword(newPassword)){
            this.state["message"] = "Password must be at least 6 characters and contain upper and lower case letters";
            return
        }
        if(newPassword==oldPassword){
            this.state["message"] = "New password identical to old password."
            return
        }
    }

    render() {

        return (

            <div>
                <Panel header="Account Settings" bsStyle="default">
                    <Form horizontal onSubmit={ this.handleSubmit.bind(this)}>
                        <FormGroup validationState="warning">
                        <FormControl type="password" value={this.state.formValues.oldPassword} name="oldPassword"
                                     placeholder="Old password" onChange={this.handleChange.bind(this)} />
                        </FormGroup>
                        <FormGroup validationState="warning">
                        <FormControl type="password" value={this.state.formValues.newPassword} name="newPassword"
                                     placeholder="New password" onChange={this.handleChange.bind(this)}/>
                        </FormGroup>
                        <FormGroup validationState="warning">
                            <FormControl type="password" value={this.state.formValues.repeatPassword} name="repeatPassword"
                                     placeholder="Repeat new password" onChange={this.handleChange.bind(this)}/>
                        </FormGroup><Button type="submit" value="Submit" >
                            Change password
                        </Button>
                    </Form>
                </Panel>
            </div>


        );
    }

}

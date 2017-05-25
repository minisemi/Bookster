/**
 * Created by Matilda on 2017-05-17.
 */
import React, { Component } from 'react';
import { Panel, Form, FormControl, Button, FormGroup, Alert} from 'react-bootstrap';
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
                newPassword: "",
                repeatPassword:""},
            formValidation:{
                oldPassword: null
            },
            message:"",
            visibility: "hiddenAlert"
        }
        this.handleChange = this.handleChange.bind(this);
        this.instantCheck = this.instantCheck.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }




    /*   http://jsfiddle.net/TzLZq/2/
     http://stackoverflow.com/questions/23123138/perform-debounce-in-react-js/24679479#24679479
     componentWillMount() {
     this.inputCallback = _.debounce(function (e) {
     var div = document.getElementById("foo");
     div.innerHTML = e.target.value;
     }, 500);
     }

     inputCallbackDelayed (e) {
     e.persist();
     this.inputCallback(e);
     }*/

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



    setMessage (context, event, helpFunction) {
        let message="";
        if(!helpFunction(event.target.value)){
            message="error";
        }
        else message="success";
        let formValidation = context.state.formValidation;
        formValidation[event.target.name] = message;
        context.setState({formValues:context.state.formValues, formValidation})
        console.log(context.state);
    }





    handleSubmit(event) {
        event.preventDefault()

        let newPassword = this.state.formValues.newPassword,
            oldPassword = this.state.formValues.oldPassword,
            repeatPassword = this.state.formValues.repeatPassword,
            formValid = this.state.formValidation;

        if (!Validation.CheckPassword(newPassword)) {
            this.setState({message: "Password must be at least 6 characters and contain upper and lower case letters"})
            formValid[newPassword] = "error"


        } else if (newPassword != repeatPassword) {
            this.setState({message: "Repeated password does not match"})
            formValid[repeatPassword] = "error"

        } else if (newPassword == oldPassword) {
            this.setState({message: "New password identical to old password."})
            formValid[newPassword] = "error"

        } else {
            formValid[newPassword] = "success"
            formValid[repeatPassword] = "success"

            changePassword(oldPassword, newPassword, Auth.getToken()).then(response => {
                this.setState({message: response});
                if (this.state.message == "Password successfully changed") {
                    this.setState({visibility: "alert-success"})
                    formValid["oldPassword"]="success"
                }
                else {
                    this.setState({visibility: "alert-danger"})
                    formValid["oldPassword"] = "error"
                    this.setState(formValid)
                }
            })

        }


    }


    render() {

        return (

            <div>
                <Panel header="Account Settings" bsStyle="default">
                    <Form horizontal onSubmit={ this.handleSubmit.bind(this)}>
                        <FormGroup validationState={this.state.formValidation.oldPassword}>
                            <FormControl type="password" value={this.state.formValues.oldPassword} name="oldPassword"
                                         placeholder="Old password" onChange={this.handleChange} />
                            <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup validationState={this.state.formValidation.newPassword}>
                            <FormControl type="password" value={this.state.formValues.newPassword} name="newPassword"
                                         placeholder="New password" onChange={this.instantCheck}/>
                            <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup validationState={this.state.formValidation.repeatPassword}>
                            <FormControl type="password" value={this.state.formValues.repeatPassword} name="repeatPassword"
                                         placeholder="Repeat new password" onChange={this.instantCheck}/>
                            <FormControl.Feedback />
                        </FormGroup><Button type="submit" value="Submit" >
                        Change password
                    </Button>
                    </Form>
                    <Alert className={`formAlert ${this.state.visibility}`} > {this.state.message}</Alert>
                </Panel>
            </div>


        );
    }

}

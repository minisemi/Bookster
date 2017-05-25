import React, { Component } from 'react';
import '../../static/BookingsSlideBar.css';
import {Alert, Panel, Form, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import { getUserInfo, updateUserInfo } from '../../utils/bookster-api';
import Auth from '../../Auth'
var buttonText = "Edit";
var changeOccured = false;
export default class InfoBar extends Component {


    constructor() {
        super()
        this.state =
            {   info:
                {email: "", firstName: "", familyName: "", birth: ""
                },
                editable: true,
                message:"",
                visibility: "hiddenAlert"
            };
    }



    handleEdit(){
        if (this.state.editable){
            buttonText= "Save";
        }
        else {
            buttonText="Edit";
            if(changeOccured) {
                var email = this.state.info.email;
                updateUserInfo(Auth.getToken(), this.state.info).then((message) => {
                    console.log (message)
                    if (message.message=="success") {
                        Auth.switchCred(message.token, email)



                    }
                });
            }
        }
        this.setState({info:this.state.info, editable:!this.state.editable})
    }

    handleChange (event){
        var info = this.state.info;
        info[event.target.name]=event.target.value;
        this.setState({info, editable: this.state.editable})
        changeOccured = true;
    }

    loadInfo(){
        getUserInfo(Auth.getToken()).then((response) => {
            this.setState({info: response,
                editable:true});
        });
    }

    componentDidMount() {
        this.loadInfo();
    }

    render() {


        return (

            <div className="BookingsSlideBar">
                <Panel header="Information" bsStyle="default"><Form horizontal>
                    <FormGroup>First name</FormGroup><FormControl type="text" disabled={this.state.editable} value={this.state.info.firstName} name="firstName"
                                                                  onChange={this.handleChange.bind(this)}/>
                    <FormGroup>Last name</FormGroup><FormControl type="text" disabled={this.state.editable} value={this.state.info.familyName} name="familyName"
                                                                 onChange={this.handleChange.bind(this)}/>
                    <FormGroup>Email</FormGroup><FormControl type="email" disabled={this.state.editable} value={this.state.info.email} name="email"
                                                             onChange={this.handleChange.bind(this)}/>
                    <FormGroup>Address</FormGroup><FormControl type="text" disabled={this.state.editable} value={this.state.info.address} name="address"
                                                               onChange={this.handleChange.bind(this)}/>
                    <FormGroup>Birthday</FormGroup><FormControl type="text" disabled={this.state.editable} value={this.state.info.birth} name="birth"
                                                                onChange={this.handleChange.bind(this)}/>
                    <Button bsStyle="warning" onClick={ this.handleEdit.bind(this)} >{buttonText}</Button>
                </Form>
                    <Alert className={`formAlert ${this.state.visibility}`} > {this.state.message}</Alert>
                </Panel>

            </div>
        );
    }
}


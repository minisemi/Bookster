import React, { Component } from 'react';
import '../../static/BookingsSlideBar.css';
import {Col, Panel, Form, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
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
                editable: true
            };
    }



    handleEdit(){
        if (this.state.editable){
            buttonText= "Save";
        }
        else {
            buttonText="Edit";
            if(changeOccured) {
                updateUserInfo(Auth.getToken(), this.state.info).then((message) => {
                    if (message) {
                        console.log("info updated!" + message)
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
            console.log(response)
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
                <Panel header="Information" bsStyle="default">
                    <Col sm={6}><label>First name</label></Col><Col sm={6}><input type="text" disabled={this.state.editable} value={this.state.info.firstName} name="firstName"
                                                                                  onChange={this.handleChange.bind(this)}/></Col>
                    <Col sm={6}><label>Last name</label></Col><Col sm={6}><input type="text" disabled={this.state.editable} value={this.state.info.familyName} name="familyName"
                                                                                 onChange={this.handleChange.bind(this)}/></Col>
                    <Col sm={6}><label>Email</label></Col><Col sm={6}><input type="email" disabled={true} value={this.state.info.email} name="email"
                                                                             onChange={this.handleChange.bind(this)}/></Col>
                    <Col sm={6}><label>Address</label></Col><Col sm={6}><input type="text" disabled={this.state.editable} value={this.state.info.address} name="address"
                                                                               onChange={this.handleChange.bind(this)}/></Col>
                    <Col sm={6}><label>Birthday</label></Col><Col sm={6}><input type="text" disabled={this.state.editable} value={this.state.info.birth} name="birth"
                                                                                onChange={this.handleChange.bind(this)}/></Col>
                    <Button bsStyle="warning" onClick={this.handleEdit.bind(this)}>{buttonText}</Button>
                </Panel>

            </div>
        );
    }
}


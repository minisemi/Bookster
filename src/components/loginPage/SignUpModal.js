import React, { Component } from 'react';
import {Button, Modal} from 'react-bootstrap';
import  DatePicker  from 'react-bootstrap-date-picker';
import '../../static/SignUpForm.css'
import { signUpUser } from '../../utils/auth-api';


export default class SignUpForm extends Component {
    render() {
        return (
            <Modal
                show={this.props.showBol}
                container={this}
                aria-labelledby="contained-modal-title"
            >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title">{this.props.title} </Modal.Title>
                    <Button onClick={this.props.handler} > Close </Button>
                </Modal.Header>
            </Modal>
        );
    }
}
import React, { Component } from 'react';
import {Button, Modal} from 'react-bootstrap';
import '../../static/SignUpForm.css'


export default class SignUpModal extends Component {
    render() {
        return (
            <Modal
                show={this.props.showBol}
                container={this}
                aria-labelledby="contained-modal-title"
            >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title"> Wrong Credentials</Modal.Title>
                    </Modal.Header>
                <Modal.Body>
                    You are trying to log in as <b>{this.props.email}</b>. Please try again with a different email address
                    and/or password.
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.handler} > Try again </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
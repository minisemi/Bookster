import React, { Component } from 'react';
import {Button, Modal} from 'react-bootstrap';

export default class MessageModal extends Component {

    constructor(props){
        super(props);
    }

    render() {
        const { title, body, buttonText, handler, show } = this.props;
        return (
            <Modal
                onHide={handler}
                show={show}
            >
                <Modal.Header >
                    <Modal.Title> {title} </Modal.Title>
                </Modal.Header>
                <Modal.Body>{body}</Modal.Body>
                <Modal.Footer>
                    <Button onClick={handler} > {buttonText} </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
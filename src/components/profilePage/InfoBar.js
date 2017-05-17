import React, { Component } from 'react';
import '../../static/BookingsSlideBar.css';
import {Col, Panel, Form, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import { getUserInfo } from '../../utils/bookster-api';
import Auth from '../../Auth'


export default class InfoBar extends Component {


    constructor() {
    super()
        this.state =
            { info:
                {email: "", firstName: "", familyName: "", birth: ""
                }
            };
    }

  loadInfo(){
            getUserInfo(Auth.getToken()).then((response) => {
                console.log(response)
                        this.setState({info: response});
                    });
  }

  componentDidMount() {
        this.loadInfo();
  }

    render() {

        return (

            <div className="BookingsSlideBar">
                <Panel header="Information" bsStyle="default">
                    <Form horizontal>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>First name</Col>
                        <Col sm={10}>
                        <FormControl.Static>
                            {this.state.info.firstName}
                        </FormControl.Static>
                             </Col>
                    </FormGroup>

                      <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>Surname</Col>
                        <Col sm={10}>
                        <FormControl.Static>
                            {this.state.info.familyName}
                        </FormControl.Static>
                             </Col>
                    </FormGroup>
                        <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>Email</Col>
                        <Col sm={10}>
                        <FormControl.Static>
                            {this.state.info.email}
                        </FormControl.Static>
                             </Col>
                    </FormGroup>
                        <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>Address</Col>
                        <Col sm={10}>
                        <FormControl.Static>
                            {this.state.info.address}
                        </FormControl.Static>
                             </Col>
                    </FormGroup>
                        <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>Birthday</Col>
                        <Col sm={10}>
                        <FormControl.Static>
                            {this.state.info.birth}
                        </FormControl.Static>
                             </Col>
                    </FormGroup>

                    </Form>
                    <Button bsStyle="warning">Edit</Button>
                </Panel>

            </div>
        );
    }
}


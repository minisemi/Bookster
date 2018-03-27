import React, { Component } from 'react';
import { Row, Col  } from 'react-bootstrap';
import '../static/ProfilePage.css';
import { Panel } from 'react-bootstrap';
import UserInfoFormContainer from './forms/UserInfoFormContainer';
import ChangePasswordFormContainer from './forms/ChangePasswordFormContainer'



export default class ProfilePageContainer extends Component {

    render() {

        return (
            <div className="profilePage">
                <Row >
                    <Col xs={12} sm={12} md={6} lg={6}>
                        <Panel>
                            <Panel.Heading>
                                <Panel.Title componentClass="h3">User information</Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                                <UserInfoFormContainer/>
                            </Panel.Body>
                        </Panel>
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6}>
                        <ChangePasswordFormContainer/>
                    </Col>
                </Row>
            </div>
        );
    }

}


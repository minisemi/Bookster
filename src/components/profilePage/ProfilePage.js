import React, { Component } from 'react';
import { Row, Col  } from 'react-bootstrap';
import '../../static/ProfilePage.css';
import InfoBar from './InfoBar';
import AccountBar from './AccountBar'



export default class ProfilePage extends Component {

    render() {

        return (
            <div className="profilePage">
              <Row >
                <Col xs={12} sm={12} md={6} lg={6}>
                  <InfoBar/>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6}>
                  <AccountBar/>
                </Col>
              </Row>
            </div>
        );
    }

}


import React, { Component } from 'react';
import { Link } from 'react-router';
import '../components/MyBookingsSlideBar.css';
import {Panel, Image, Grid, Row, Col, Thumbnail} from 'react-bootstrap';




class MyBookingsSlideBar extends Component {
    render() {
        return (


            <div className="MyBookingsSlideBar">
                <Panel header='My bookings' bsStyle="primary">
                    <Grid>
                    <Row>
                        <Col xs={12} sm={5} md={4} lg={2}>
                    <Thumbnail href="#" alt="171x180" src={require('../assets/SoccerField.png')} />
                        </Col>
                        <Col xs={12} sm={6} md={4} lg={2}>
                    <Thumbnail href="#" alt="171x180" src={require('../assets/Laundromat.png')} />
                        </Col>
                    </Row>
                    </Grid>
                </Panel>

            </div>
        );
    }
}

export default MyBookingsSlideBar;
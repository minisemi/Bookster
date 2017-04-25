import React, { Component } from 'react';
import { Link } from 'react-router';
import '../static/BookingsSlideBar.css';
import {Panel, Image, Grid, Row, Col, Thumbnail} from 'react-bootstrap';




class BookingsSlideBar extends Component {



    render() {
        return (

            <div className="BookingsSlideBar">
                <Panel header={this.props.title} bsStyle="primary">
                    <Row>
                        <Col xs={12} sm={5} md={3} lg={2}>
                    <Thumbnail href="#" alt="171x300" src='/assets/SoccerField.png' />
                        </Col>
                        <Col xs={12} sm={5} md={3} lg={2}>
                    <Thumbnail href="#" alt="171x180" src='/assets/SoccerField.png' />
                        </Col>
                        <Col xs={12} sm={5} md={3} lg={2}>
                    <Thumbnail href="#" alt="171x180" src='/assets/SoccerField.png' />
                        </Col>
                        <Col xs={12} sm={5} md={3} lg={2}>
                    <Thumbnail href="#" alt="171x180" src='/assets/SoccerField.png' />
                        </Col>
                    </Row>
                </Panel>

            </div>
        );
    }
}

export default BookingsSlideBar;
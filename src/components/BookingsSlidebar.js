import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../static/BookingsSlideBar.css';
import {Panel, Image, Grid, Row, Col, Thumbnail} from 'react-bootstrap';
import BookingThumbnail from './BookingThumbnail';



class BookingsSlideBar extends Component {



    render() {
        return (

            <div className="BookingsSlideBar">
                <Panel header={this.props.title} bsStyle="default">
                    <Row>
                        <Col xs={12} sm={5} md={3} lg={2}>
                            <BookingThumbnail/>
                        </Col>
                        <Col xs={12} sm={5} md={3} lg={2}>
                    <BookingThumbnail/>
                        </Col>
                        <Col xs={12} sm={5} md={3} lg={2}>
                    <BookingThumbnail/>
                        </Col>
                        <Col xs={12} sm={5} md={3} lg={2}>
                    <BookingThumbnail/>
                        </Col>
                    </Row>
                </Panel>

            </div>
        );
    }
}

export default BookingsSlideBar;
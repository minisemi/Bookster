import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../static/BookingsSlideBar.css';
import {Panel, Image, Grid, Row, Col, Thumbnail} from 'react-bootstrap';
import BookingThumbnail from './BookingThumbnail';
import bookings from '../data/bookings';



class BookingsSlideBar extends Component {



    render() {
        return (

            <div className="BookingsSlideBar">
                <Panel header={this.props.title} bsStyle="primary">
                    <Row>
                            {bookings.map(bookings => <Col key={bookings.id} xs={12} sm={5} md={3} lg={2}>
                                                            <BookingThumbnail {...bookings} />
                                                        </Col>)}
                    </Row>
                </Panel>

            </div>
        );
    }
}

export default BookingsSlideBar;
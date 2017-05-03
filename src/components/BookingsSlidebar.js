import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../static/BookingsSlideBar.css';
import {Panel, Image, Grid, Row, Col, Thumbnail} from 'react-bootstrap';
import BookingThumbnail from './BookingThumbnail';
//import bookings from '../data/bookings';
import { getCurrentBookings } from '../utils/bookster-api';

class BookingsSlideBar extends Component {


    constructor() {
    super()
    this.state = { bookings: []};
  }

  getBooking() {
getCurrentBookings().then((objects) => {
      this.setState({ bookings:objects });
    });
  }

  componentDidMount() {
    this.getBooking();
  }

    render() {
        const { bookings }  = this.state;
        return (

            <div className="BookingsSlideBar">
                <Panel header={this.props.title} bsStyle="default">
                    <Row>
                        { bookings.map((booking )=> (
                            <Col key={booking.id} xs={12} sm={5} md={3} lg={2}>
                                <BookingThumbnail {...booking} />
                            </Col>
                        ))}
                    </Row>
                </Panel>

            </div>
        );
    }
}

export default BookingsSlideBar;
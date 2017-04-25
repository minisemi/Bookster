import React, { Component } from 'react';
import { Link } from 'react-router';
import '../static/BookingThumbnail.css';
import {Panel, Image, Grid, Row, Col, Thumbnail} from 'react-bootstrap';




export default class BookingThumbnail extends Component {

    render() {
        return (

                <Link to={`/bookings/${this.props.id}`}>
        <div className="BookingThumbnail">
            <Image src='/assets/SoccerField.png' rounded responsive/>
          <h2>Tvättstuga</h2>
        </div>
      </Link>

        );
    }
}
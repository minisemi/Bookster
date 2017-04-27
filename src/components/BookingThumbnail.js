import React, { Component } from 'react';
import { Link } from 'react-router';
import '../static/BookingThumbnail.css';
import {Panel, Image, Grid, Row, Col, Thumbnail} from 'react-bootstrap';

export default class BookingThumbnail extends Component {

    render() {
        return (

                <Link to={`/booking/${this.props.id}`}>
        <div className="BookingThumbnail">
            <Image src={`/assets/bookingThumbnails/${this.props.image}`} rounded responsive/>
          <h2>{this.props.name}</h2>
        </div>
      </Link>

        );
    }
}
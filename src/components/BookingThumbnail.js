import React, { Component } from 'react';
import { Link } from 'react-router';
import '../static/BookingThumbnail.css';
import {Grid, Col, Row, Image} from 'react-bootstrap';

export default class BookingThumbnail extends Component {

    render() {
        return (

                <Link to={`/${this.props.companyAlias}/${this.props.bookableAlias}`}>
        <div className="bookingThumbnail">
                <Col xs={6} sm={6} md={12} lg={12}>
            <Image src={`/assets/bookingThumbnails/${this.props.image}`} thumbnail responsive/>
                </Col>
            <Col xs={6} sm={6} md={12} lg={12}>
          <h2>{this.props.name}</h2>
            </Col>
        </div>
      </Link>

        );
    }
}
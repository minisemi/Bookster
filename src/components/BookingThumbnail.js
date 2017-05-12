import React, { Component } from 'react';
import { Link } from 'react-router';
import '../static/BookingThumbnail.css';
import {Image} from 'react-bootstrap';

export default class BookingThumbnail extends Component {

    render() {
        return (

                <Link to={`/${this.props.company}/${this.props.id}`}>
        <div className="bookingThumbnail">
            <Image src={`/assets/bookingThumbnails/${this.props.image}`} thumbnail responsive/>
          <h2>{this.props.name}</h2>
        </div>
      </Link>

        );
    }
}
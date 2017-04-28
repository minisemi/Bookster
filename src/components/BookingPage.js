import React, { Component } from 'react';
import { Link } from 'react-router';
import {Panel, Image, Grid, Row, Col, Thumbnail} from 'react-bootstrap';
import bookings from '../data/bookings';
import '../static/BookingPage.css';
import NotFoundPage from './NotFoundPage';



class BookingPage extends Component {

render() {
    const id = this.props.params.id;
    const booking = bookings.filter((booking) => booking.id===id )[0];
    if (!booking) {
      return <NotFoundPage/>;
    }
    const headerStyle = { backgroundImage: `url(/assets/bookingPage/${booking.cover})` };
    return (
      <div className="booking-full">
        <div className="booking">
          <header style={headerStyle}/>
          <div className="picture-container">
            <img src={`/assets/bookingThumbnails/${booking.image}`}/>
            <h2 className="name">{booking.name}</h2>
          </div>
          <section className="description">
            Laundromat in Sweden.
            Find more info at <a href={booking.link} target="_blank">Wikipedia</a>.
          </section>
        </div>
        <div className="navigateBack">
          <Link to="/special">« Back to the index</Link>
        </div>
      </div>
    );
  }
}

export default BookingPage;
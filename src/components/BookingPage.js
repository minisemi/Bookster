import React, { Component } from 'react';
import '../static/BookingPage.css';
import NotFoundPage from './NotFoundPage';
import { getBooking } from '../utils/bookster-api';
import BookingCalender from './BookingCalender';
import Popup from 'react-popup';
import {Button} from 'react-bootstrap';



class BookingPage extends Component {

    constructor() {
    super();
    this.state = { bookings: []};
  }

  componentWillReceiveProps(nextProps){
        if (nextProps.params.id !== this.props.params.id) {
            getBooking(nextProps.params.compId, nextProps.params.id).then((objects) => {
      this.setState({ bookings:objects });
    });
    }
  }

  componentDidMount(){
    getBooking(this.props.params.compId, this.props.params.id).then((objects) => {
      this.setState({ bookings:objects });
    });
  }

render() {
    //const id = this.props.params.id;
    const { bookings }  = this.state;
    //const booking = bookings.filter((booking) => booking.id===id )[0];
    const booking = bookings;
    if (!booking) {
      return <NotFoundPage/>;
    }
    const headerStyle = { backgroundImage: `url(/assets/bookingPage/${booking.cover})` };
    return (
      <div className="booking-full">
        <div className="booking">
          <header style={headerStyle}/>
          <div className="picture-container">
            <img alt="" src={`/assets/bookingThumbnails/${booking.image}`}/>
            <h2 className="name">{booking.name}</h2>
          </div>
          <section className="description">
              {booking.info}
          </section>
            <BookingCalender bookingId={this.props.params.id}/>
        </div>
      </div>
    );
  }
}

export default BookingPage;
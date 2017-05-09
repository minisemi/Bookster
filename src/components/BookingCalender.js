import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import events from '../data/events';
import '../static/BookingCalender.css'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const MyCalendar = props => (
  <div>
    <BigCalendar
      events={events}
      defaultDate={new Date(2015, 3, 1)}
    />
  </div>
);

export default class BookingCalender extends Component {



    render() {
        return (
            <MyCalendar/>
        );
    }
}
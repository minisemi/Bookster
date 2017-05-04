import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from '../logo.svg';
import '../static/App.css';
import {Grid, Row, Col} from 'react-bootstrap';
import BookingsSlideBar from './BookingsSlidebar';
import BookingsSearch from './BookingsSearch'


export default class App extends Component {

  render() {

    return (

      <div className="App">
          <Grid>

          <Row>
              <BookingsSlideBar title="My bookings"/>

          </Row>
          <Row>
              <BookingsSlideBar title="My Favourites"/>
          </Row>
          <Row>
              <BookingsSlideBar title="Recommendations"/>

          </Row>
          </Grid>
      </div>


    );
  }

}

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
              <BookingsSlideBar title="My bookings" type="current" id="matildasoderholm@gmail.com"/>

          </Row>
          <Row>
              <BookingsSlideBar title="My Favourites" type="favourites" id="matildasoderholm@gmail.com"/>
          </Row>
          <Row>
              <BookingsSlideBar title="Recommendations" type="recommendations" id="matildasoderholm@gmail.com"/>

          </Row>
          </Grid>
      </div>


    );
  }

}

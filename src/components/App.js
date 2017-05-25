import React, { Component } from 'react';
import '../static/App.css';
import {Grid, Row} from 'react-bootstrap';
import BookingsSlideBar from './BookingsSlidebar';
import Auth from '../Auth';


export default class App extends Component {

  render() {

    return (

      <div className="App">
          <Grid>
          <Row>
              <BookingsSlideBar title="My bookings" type="current" id={Auth.getEmail()}/>

          </Row>
          <Row>
              <BookingsSlideBar title="My Favourites" type="favourites" id={Auth.getEmail()}/>
          </Row>
          <Row>
              <BookingsSlideBar title="Recommendations" type="recommendations" id={Auth.getEmail()}/>

          </Row>
          </Grid>
      </div>


    );
  }

}

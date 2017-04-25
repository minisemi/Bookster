import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from '../logo.svg';
import '../static/App.css';
import { getCurrentBookings } from '../utils/bookster-api';
import {Grid, Row, Col} from 'react-bootstrap';
import BookingsSlideBar from './BookingsSlidebar';

class App extends Component {

     constructor() {
    super()
    this.state = { objects: [],
                    search:[]};
  }

  getBooking() {
    getCurrentBookings().then((objects) => {
      this.setState({ objects:objects });
    });
  }

  componentDidMount() {
    this.getBooking();
  }

  render() {
      const { objects }  = this.state;
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


            <Row>
        { objects.map((object )=> (
              <div className="col-sm-2" key={object.id}>
                <div className="panel panel-primary">
                  <div className="panel-heading">
                    <h3 className="panel-title"> <span >#{ object.id }</span></h3>
                  </div>
                  <div className="panel-body">
                    <p> { object.object } </p>
                      <p> { object.renter} </p>
                  </div>
                </div>
              </div>
          ))}
            </Row>
          </Grid>
      </div>


    );
  }

}

export default App;

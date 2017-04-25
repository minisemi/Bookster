import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from '../logo.svg';
import '../App.css';
import { getCurrentBookings } from '../utils/bookster-api';

class App extends Component {

     constructor() {
    super()
    this.state = { objects: [] };
  }

  getBooking() {
    getCurrentBookings().then((objects) => {
      this.setState({ objects });
    });
  }

  componentDidMount() {
    this.getBooking();
  }

  render() {
      const { objects }  = this.state;
    return (

      <div className="App">

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
      </div>

    );
  }

}

export default App;

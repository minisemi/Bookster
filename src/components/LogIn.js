import React, { Component } from 'react';
import { Link } from 'react-router';
import Nav from './Nav';


class LogIn extends Component {

  render() {

    return (
      <div>
        <Nav />


        <div className="col-sm-12">
          <div className="jumbotron text-center">
            <h2>Welcome</h2>
              <ul>



          </ul>
              <button className="btn btn-info log">Log In</button>

          </div>
        </div>
      </div>
    );
  }
}

export default LogIn;
import React, { Component } from 'react';
import { Link, Grid, Row } from 'react-router';
import '../../static/ProfilePage.css';
import { getCompany } from '../../utils/bookster-api';
import BookingsSlideBar from '../BookingsSlidebar';
import InfoBar from './InfoBar';



export default class ProfilePage extends Component {

  render() {

    return (

      <div >
          <InfoBar/>
      </div>


    );
  }

}


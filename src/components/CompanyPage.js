import React, { Component } from 'react';
import { Link } from 'react-router';
import {Panel, Image, Grid, Row, Col, Thumbnail} from 'react-bootstrap';
import '../static/BookingPage.css';
import NotFoundPage from './NotFoundPage';
import { getCompany } from '../utils/bookster-api';
import BookingSlidebar from './BookingsSlidebar';



export default class CompanyPage extends Component {

    constructor() {
    super()
    this.state = { companies: []};
  }

  componentDidMount() {
    getCompany(this.props.params.id).then((objects) => {
      this.setState({ companies:objects });
    });
  }

render() {
    const { companies }  = this.state;
    const company = companies;
    console.log(company);
    if (!company) {
      return <NotFoundPage/>;
    }

    const headerStyle = { backgroundImage: `url(/assets/bookingPage/${company.cover})` };
    return (
      <div className="booking-full">
        <div className="booking">
          <header style={headerStyle}/>
          <div className="picture-container">
            <img src={`/assets/searchResults/${company.image}`}/>
            <h2 className="name">{company.company}</h2>
          </div>
          <section className="description">
              {company.info}
          </section>
            <BookingSlidebar title="Bookable objects"/>
        </div>
        <div className="navigateBack">
          <Link to="/special">« Back to the index</Link>
        </div>
      </div>
    );
  }
}


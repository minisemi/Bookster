import React, { Component } from 'react';
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

  componentWillReceiveProps(nextProps){
        if (nextProps.params.id !== this.props.params.id) {
            getCompany(nextProps.params.id).then((objects) => {
      this.setState({ companies:objects });
    });
    }
  }

render() {

    const { companies }  = this.state;
    const company = companies;
    if (!company) {
      return <NotFoundPage/>;
    }

    const headerStyle = { backgroundImage: `url(/assets/bookingPage/${company.cover})` };
    return (
      <div className="booking-full">
        <div className="booking">
          <header style={headerStyle}/>
          <div className="picture-container">
            <img alt="" src={`/assets/searchResults/${company.image}`}/>
            <h2 className="name">{company.name}</h2>
          </div>
          <section className="description">
              {company.info}
          </section>
            <BookingSlidebar title="Bookable objects" type="company" id={company.id}/>
        </div>
      </div>
    );
  }
}


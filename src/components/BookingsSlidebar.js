import React, { Component } from 'react';
import '../static/BookingsSlideBar.css';
import {Panel, Row, Col} from 'react-bootstrap';
import BookingThumbnail from './BookingThumbnail';
//import companies from '../data/companies';
import { getCurrentBookings, getCompanyBookables, getFavourites, getRecommendations } from '../utils/bookster-api';

// A BOOKINGSSLIDEBAR NEEDS THE FOLLOWONG PROPS: TITLE, TYPE, ID.

class BookingsSlideBar extends Component {


    constructor() {
    super()
    this.state = { bookings: []};
  }

  loadBookings(id){
        if (id!==undefined) {
            switch (this.props.type) {
                case "company":
                    getCompanyBookables(id).then((objects) => {
                        this.setState({bookings: objects});
                    });
                    break;
                case "favourites" :
                    getFavourites(id).then((objects) => {
                        this.setState({bookings: objects});
                    });
                    break;
                case "current":
                    getCurrentBookings(id).then((objects) => {
                        this.setState({bookings: objects});
                    });
                    break;
                case "recommendations":
                    getRecommendations(id).then((objects) => {
                        this.setState({bookings: objects});
                    });
                    break;

                default:
                    break;
            }
        }
  }

  componentWillReceiveProps(nextProps){
        if (nextProps.id !== this.props.id) {
            this.loadBookings(nextProps.id);
    }
  }

  componentDidMount() {
        this.loadBookings(this.props.id);
  }

    render() {
        const { bookings }  = this.state;
        return (

            <div className="BookingsSlideBar">
                <Panel header={this.props.title} bsStyle="default">
                    <Row>
                        { bookings.map((booking,index )=> (
                            <Col key={index} sm={6} md={3} lg={2}>
                                <BookingThumbnail {...booking} />
                            </Col>
                        ))}
                    </Row>
                </Panel>

            </div>
        );
    }
}

export default BookingsSlideBar;
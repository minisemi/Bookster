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
        this.state = {
            bookings: [],
            slideBarText:""
        };
    }

    loadBookings(id){
        if (id!==undefined) {
            switch (this.props.barType) {
                case "company":
                    getCompanyBookables(id).then((objects) => {
                        this.setState({bookings: objects, slideBarText:"This company doesn't have any bookables yet."});
                    });
                    break;
                case "favourites" :
                    getFavourites(id).then((objects) => {
                        this.setState({bookings: objects, slideBarText:"You don't have any favourites. Press the favourite button on your favourite bookables to save them here!"});
                    });
                    break;
                case "current":
                    getCurrentBookings(id).then((objects) => {
                        this.setState({bookings: objects, slideBarText:"You don't have any bookings. Search for bookables/companies above and book them to see them here!"});
                    });
                    break;
                case "recommendations":
                    getRecommendations(id).then((objects) => {
                        this.setState({bookings: objects, slideBarText:"You don't have any recommendations. Start booking to get some from us!"});
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
        const { bookings,slideBarText }  = this.state;
        let text="";
        if (bookings.length===0){
            text=slideBarText;
        }

        return (

            <div className="BookingsSlideBar">
                <Panel header={this.props.title} bsStyle="default">
                    <Row>
                        { bookings.map((booking,index )=> (
                            <Col key={index} sm={6} md={3} lg={2}>
                                <BookingThumbnail barType={this.props.barType} {...booking} />
                            </Col>
                        ))}
                        <a>{text}</a>
                    </Row>
                </Panel>

            </div>
        );
    }
}

export default BookingsSlideBar;
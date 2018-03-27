import React, { Component } from 'react';
import '../../static/BookingsSlideBar.css';
import {Panel, Row, Col} from 'react-bootstrap';
import BookingThumbnail from './BookingThumbnail';
import PropTypes from 'prop-types';
//import companies from '../data/companies';

// A BOOKINGSSLIDEBAR NEEDS THE FOLLOWONG PROPS: TYPE, bookables.

class BookingsSlideBar extends Component {

    static propTypes = {
        bookables: PropTypes.array,
        barType: PropTypes.string,
    };

    constructor(props) {
        super(props);
        const barSettings = this.decideType(props);
        this.state = {
            bookables: props.bookables || [],
            slideBarText: barSettings.slideBarText,
            title: barSettings.title,
        };
    }

    decideType(props){
        let slideBarText;
        let title;
        switch (props.barType) {
            case "company":
                slideBarText = "This company doesn't have any bookables yet.";
                title = "Bookable objects";
                break;
            case "favourites" :
                slideBarText = "You don't have any favourites. Press the favourite button on your favourite bookables to save them here!";
                title = "My Favourites";
                break;
            case "current":
                slideBarText = "You don't have any bookings. Search for bookables/companies above and book them to see them here!";
                title = "My bookings";
                break;
            case "recommendations":
                slideBarText = "You don't have any recommendations. Start booking to get some from us!";
                title = "Recommendations";
                break;

            default:
                break;
        }
        return {slideBarText, title};
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.bookables !== this.props.bookables) {
            this.setState({
                bookables: nextProps.bookables
            });
        }
    }

    render() {
        let { bookables, slideBarText, title }  = this.state;
        return (
                <Panel className="BookingsSlideBar">
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">{title}</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <Row>
                            { bookables.map((booking,index )=> (
                                <Col key={index} sm={6} md={3} lg={2}>
                                    <BookingThumbnail barType={this.props.barType} {...booking} />
                                </Col>
                            ))}
                            <a>{bookables.length===0 ? slideBarText : ""}</a>
                        </Row>
                    </Panel.Body>
                </Panel>
        );
    }
}

export default BookingsSlideBar;
import React, { Component } from 'react';
import { Link } from 'react-router';
import '../static/BookingThumbnail.css';

export default class BookingThumbnail extends Component {


    render() {
        let startDate;
        let endTime;
        let startTime;
        if (this.props.barType==="current"){
        startDate = new Date(this.props.start).toDateString();
        startTime = new Date(this.props.start).toLocaleTimeString('en-GB',{hour:'2-digit', minute:'2-digit'});
        endTime = new Date(this.props.end).toLocaleTimeString('en-GB',{hour:'2-digit', minute:'2-digit'});
        }else {
             startDate =""
        }

        const backgroundStyle = { backgroundImage: `url(${this.props.image})` };

        return (

            <Link to={`/${this.props.companyAlias}/${this.props.bookableAlias}`}>
                <div className="thumbnailContainer">
                <div  style={backgroundStyle} className="bookingThumbnail">
                    <div className="bookingTextBox">
                        <br/><a>{this.props.name}</a>
                        <br/><a>{startDate}</a>
                        <br/><a>{startTime}-{endTime}</a>
                    </div>
                </div>
                </div>
            </Link>

        );
    }

    // ALTERNATE LAYOUT. SAVING FOR FUTURE REBUILD OF CURRENT LAYOUT
    /*render() {
        return (

            <Link to={`/${this.props.companyAlias}/${this.props.bookableAlias}`}>
                <div className="bookingThumbnail">
                    <Col xs={6} sm={6} md={12} lg={12}>
                        <div className="bookingPicture">
                        <Image src={this.props.image} thumbnail responsive/>
                        </div>
                    </Col>
                    <Col xs={6} sm={6} md={12} lg={12}>
                        <h2>{this.props.name}</h2>
                    </Col>
                </div>
            </Link>

        );
    }*/
}
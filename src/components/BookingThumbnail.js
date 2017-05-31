import React, { Component } from 'react';
import { Link } from 'react-router';
import '../static/BookingThumbnail.css';
import {Grid, Col, Row, Image} from 'react-bootstrap';
import moment from 'moment';

export default class BookingThumbnail extends Component {


    render() {
        /*let start;
        console.log(this.props.barType)
        if (this.props.barType==="current"){

         start=this.props.start;
        let end=this.props.end;
        start = new Date(this.props.end).toDateString();
        end = new Date(this.props.start).toDateString();
        }else {
             start =""
        }*/

        const backgroundStyle = { backgroundImage: `url(${this.props.image})` };

        return (

            <Link to={`/${this.props.companyAlias}/${this.props.bookableAlias}`}>
                <div className="thumbnailContainer">
                <div  style={backgroundStyle} className="bookingThumbnail">
                    <div className="bookingTextBox">
                        <br/><a>{this.props.name}</a>
                    </div>
                </div>
                </div>
            </Link>

        );
    }
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
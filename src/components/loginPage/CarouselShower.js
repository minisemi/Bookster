import React, {Component} from 'react';
import {Carousel} from 'react-bootstrap';
import '../../static/CarouselShower.css';

export default class CarouselShower extends Component{

    render(){
        return (
            <Carousel className="car">
                <Carousel.Item>
                    <img alt="" className="carImage" src="/assets/bookingThumbnails/tennisCourt.png"/>
                    <Carousel.Caption>
                        <h3>Get exercised!</h3>
                        <p>Easily explore and book nearby sports facilities with the push of a button</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img alt="" className="carImage" src="/assets/bookingThumbnails/Laundromat.png"/>
                    <Carousel.Caption>
                        <h3>Recruit!</h3>
                        <p>Forget the sheet of paper with bookings for the laundromat in the basement. Get your landlord to sign up for Bookster now!</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img alt="" className="carImage" src="/assets/bookingThumbnails/SoccerFieldNight.png"/>
                    <Carousel.Caption>
                        <h3>All on one site!</h3>
                        <p>Gather all your bookings on one place and skip the hassle of remembering all different sites, usernames and password.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        );
    }
}
import React, {Component} from 'react';
import {Carousel, CarouselItem, Image} from 'react-bootstrap';
import '../../static/CarouselShower.css';

export default class CarouselShower extends Component{

    render(){

        return (
            <Carousel className = "car">
                <Carousel.Item>
                    <img className="carImage" src="/assets/SoccerField.png"/>
                    <Carousel.Caption>
                        <h3>Tvättstuga</h3>
                        <p>Här kan man tvätta</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="carImage" src="/assets/SoccerField.png"/>
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="carImage" src="/assets/SoccerField.png"/>
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

        );
    }
}
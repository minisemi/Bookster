import React, { Component } from 'react';
import '../../static/BookingPage.css';
import NotFoundPage from '../layout/NotFoundPage';
import { getBookable, addFavourite, deleteFavourite } from '../../utils/bookster-api';
import BookingCalender from '../bookablePage/BookingCalender';
import Popup from 'react-popup';
import {Button, Glyphicon} from 'react-bootstrap';
import Auth from '../../Auth'



class BookingPage extends Component {

    constructor() {
    super();
    this.state = { bookings: []}
  }

  componentWillReceiveProps(nextProps){
        if (nextProps.params.id !== this.props.params.id) {
            getBookable(nextProps.params.compId, nextProps.params.id, Auth.getUserId()).then((objects) => {
      this.setState({ bookings:objects });
    });
    }
  }

  componentDidMount(){
    getBookable(this.props.params.compId, this.props.params.id, Auth.getUserId()).then((objects) => {
      let favourite=true,
      buttonText="Remove from favourites",
          buttonClass="heart";
      //toggle favourite boolean if necessary
      if (!objects.favourite){
          favourite=false;
          buttonText= "Add to favourites"
          buttonClass= "heart-empty";
      }
      this.setState({ bookings:objects, favourite:favourite, buttonText:buttonText, buttonClass:buttonClass });
    });
  }

  handleClick(){
      console.log(this.props.params.compId)
      if(!this.state.favourite)
          addFavourite(Auth.getUserId(), this.props.params.id, this.props.params.compId).then((response)=>{
              if (response.message=="success") {
                  this.setState({
                      favourite: true,
                      buttonText: "Remove from favourites",
                      buttonClass: "heart"
                  })
              }
          })
      else
          deleteFavourite(Auth.getUserId(), this.props.params.id, this.props.params.compId).then((response)=>{
              if(response.message=="success") {
                  this.setState({
                      favourite: false,
                      buttonText: "Add to favourites",
                      buttonClass: "heart-empty"
                  })
              }
          })
  }

render() {
    //const id = this.props.params.id;
    const { bookings }  = this.state;
    //const booking = bookings.filter((booking) => booking.id===id )[0];
    const booking = bookings;
    if (!booking) {
      return <NotFoundPage/>;
    }
    const headerStyle = { backgroundImage: `url(${booking.cover})` };
    return (
      <div className="booking-full">
        <div className="booking">
          <header style={headerStyle}/>
          <div className="picture-container">
            <img alt="" src={booking.image}/>
            <h2 className="name">{booking.name}</h2>
              <Button bsStyle="warning" onClick={this.handleClick.bind(this)}>{this.state.buttonText} <Glyphicon glyph={this.state.buttonClass} /> </Button>
          </div>
          <section className="description">
              {booking.info}
          </section>
            <BookingCalender bookingId={this.props.params.id}/>
        </div>
      </div>
    );
  }
}

export default BookingPage;
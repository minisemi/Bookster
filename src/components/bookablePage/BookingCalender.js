// @flow
import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
//import HTML5Backend from 'react-dnd-html5-backend'
//import { DragDropContext } from 'react-dnd'
//import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import '../../static/BookingCalender.css'
//import 'react-big-calendar/lib/addons/dragAndDrop/styles.less';
import Popup from 'react-popup';
import Auth from '../../Auth'
import PropTypes from 'prop-types';
//import update from 'react-addons-update';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer
//const DragAndDropCalendar = withDragAndDrop(BigCalendar);


class BookingCalender extends Component {

    static propTypes = {
        events: PropTypes.array,
        bookEvent: PropTypes.func.isRequired,
        unBookEvent: PropTypes.func.isRequired,
        error: PropTypes.object,
    };

    constructor (props) {
        super(props);
        this.state = {
            events: props.events || []
        };

        //this.moveEvent = this.moveEvent.bind(this)
        this.handleSelectEvent = this.handleSelectEvent.bind(this);
        this.eventPropGetter = this.eventPropGetter.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.events !== this.props.events) {
            this.setState({events: nextProps.events})
        }
        if (nextProps.error !== this.props.error && nextProps.error !== undefined) {
            Popup.create({
                title: "Booking failed",
                content: <b>{nextProps.error.message}</b>,
                buttons: {
                    right: [{
                        text: 'Ok',
                        action: function () {
                            Popup.close();
                        }
                    }]
                }
            });
        }
    }

    handleSelectEvent(event) {
        let context = this;
        //For unbooked events
        let startDate = new Date(event.start).toDateString();
        let endDate = new Date(event.end).toDateString();
        let startTime = new Date(event.start).toLocaleTimeString('en-GB',{hour:'2-digit', minute:'2-digit'});
        let endTime = new Date(event.end).toLocaleTimeString('en-GB',{hour:'2-digit', minute:'2-digit'});
        if (event.bookedBy === null){

            Popup.create({
                title: event.title,
                content: <div><b>Are you sure you want to book the following bookable?</b>
                    <br/><br/><p><b>Description: </b>{event.descr}</p>
                    <br/><p><b>Start: </b>{`${startDate}, ${startTime}`}</p>
                    <br/><p><b>End: </b>{`${endDate}, ${endTime}`}</p>
                </div>,
                buttons: {
                    left: [{
                        text: 'Cancel',
                        className: 'danger',
                        action: function () {
                            Popup.close();
                        }
                    }],
                    right: [{
                        text: 'Book',
                        className: 'success',
                        action: function () {
                            context.props.bookEvent(event.bookableAlias, moment(event.start).format("x"));
                            Popup.close();
                        }
                    }]
                }
            });
            //Events booked by current user
        } else{

            if (event.bookedBy == Auth.getUserId()){
                Popup.create({
                    title: event.title,
                    content: <div><b>Are you sure you want to cancel the following bookable?</b>
                        <br/><br/><p><b>Description: </b>{event.descr}</p>
                        <br/><p><b>Start: </b>{`${startDate}, ${startTime}`}</p>
                        <br/><p><b>End: </b>{`${endDate}, ${endTime}`}</p>
                    </div>,
                    buttons: {
                        left: [{
                            text: 'Close',
                            action: function () {
                                Popup.close();
                            }
                        }],
                        right: [{
                            text: 'Cancel booking',
                            className: 'danger',
                            action: function () {
                                context.props.unBookEvent(event.bookableAlias,moment(event.start).format("x"));
                                Popup.close();
                            }
                        }]
                    }
                });
                //Booked by other user
            }else {
                Popup.create({
                    title: event.title,
                    content: "This bookable is already booked for this timeslot.",
                    buttons: {
                        right: [{
                            text: 'Ok',
                            className: 'success',
                            action: function () {
                                Popup.close();
                            }
                        }]
                    }
                });
            }
        }
    }

    eventPropGetter (event, start, end, isSelected) {
        let style;
        if (event.bookedBy !== null) {
            if (isSelected){
                if (event.bookedBy == Auth.getUserId()) {
                    style = {
                        backgroundColor: "#ffd688",
                        borderColor: "#ffdda8"
                    };
                }else{
                    style = {
                        backgroundColor: "#b30000",
                        borderColor: "#e60000"
                    };
                }
            }else{
                if (event.bookedBy == Auth.getUserId()){
                    style = {
                        backgroundColor: "#ffd688",
                        borderColor: "#ffdda8"
                    };
                }else{
                    style = {
                        backgroundColor: "#ff4d4d",
                        borderColor: "#ff6666"
                    };
                }
            }
        } else{
            if (isSelected){
                style = {
                    backgroundColor: "#224f77",
                    borderColor:"#2d6a9f"
                };
            }else {
                style = {
                    backgroundColor: "#3174ad",
                    borderColor:"#3884c7"
                };
            }
        }
        return {
            style: style
        };
    }

    onSelecting(){
        return false;
    }

    render() {
        return (
            <div>
                <BigCalendar
                    selectable
                    events={this.state.events}
                    onSelectEvent={this.handleSelectEvent}
                    eventPropGetter={this.eventPropGetter}
                    onSelecting={this.onSelecting}
                    defaultView='week'
                    defaultDate={new Date(2017, 4, 31)}
                    scrollToTime={new Date(2017, 4, 31, 15)}
                    culture="en-GB"
                />
            </div>

        );
    }

    //SAVING THIS AND OTHER DRAG AND DROP COMMENTED CODE FOR LATER IMPLEMENTATION OF DND FEATURES
    /*render() {
     return (
     <DragAndDropCalendar
     selectable={true}
     events={this.state.events}
     onEventDrop={this.moveEvent}
     onSelectEvent={event => this.onSelectEvent(event)}
     onSelectSlot={(slotInfo) => alert(
     `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
     `\nend: ${slotInfo.end.toLocaleString()}`
     )}
     defaultView='week'
     defaultDate={new Date(2017, 4, 15)}
     />
     );
     }*/
}

//export default DragDropContext(HTML5Backend)(BookingCalender)
export default BookingCalender
// @flow
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
//import events from '../data/events';
import HTML5Backend from 'react-dnd-html5-backend'
//import { DragDropContext } from 'react-dnd'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import '../static/BookingCalender.css'
//import 'react-big-calendar/lib/addons/dragAndDrop/styles.less';
import {getCalenderEvents, bookEvent, unBookEvent} from '../utils/bookster-api'
import {PopupWindow} from './Prompt'
import {Button} from 'react-bootstrap';
import {Prompt} from './Prompt';
import Popup from 'react-popup';
import Auth from '../Auth'
import update from 'react-addons-update';


// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer
//const DragAndDropCalendar = withDragAndDrop(BigCalendar);


class BookingCalender extends Component {

    constructor (props) {
        super(props);

        this.state = {
            events: [],
        };


        //this.moveEvent = this.moveEvent.bind(this)
        this.handleSelectEvent = this.handleSelectEvent.bind(this);
        this.eventPropGetter = this.eventPropGetter.bind(this);
    }


    componentDidMount(){

        if (this.props.bookingId!==undefined) {
            console.log("componentDIdMount2")
            getCalenderEvents(this.props.bookingId).then((events) => {
                for (let i =0; i<events.length;i++){

                    //events[i].start=Math.round(new Date().getTime()/1000.0);
                    events[i].start=new Date(events[i].start);
                    events[i].end=new Date(events[i].end);

                }
                this.setState({events: events})
            })
        }

    }

    componentWillReceiveProps(nextProps){


        if (nextProps.bookingId !== this.props.bookingId) {
                        console.log("componentReceiveProps2")

            getCalenderEvents(nextProps.bookingId).then((events) => {
                for (let i =0; i<events.length;i++){

                    events[i].start=new Date(events[i].start);
                    events[i].end=new Date(events[i].end);

                }
                this.setState({events:events})
            })
        }
    }


    /*moveEvent({ event, start, end }) {
     const { events } = this.state;

     const idx = events.indexOf(event);
     const updatedEvent = { ...event, start, end };

     const nextEvents = [...events]
     nextEvents.splice(idx, 1, updatedEvent)

     this.setState({
     events: nextEvents
     })

     alert(`${event.title} was dropped onto ${event.start}`);
     }*/

    handleSelectEvent(event) {

            let context = this;
        if (event.bookedBy === null){

            Popup.create({
                title: event.title,
                content: "Are you sure you wont to book the selected bookable? ",
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
                            bookEvent(event.bookableAlias,moment(event.start).format("x"),Auth.getEmail()).then(response=>{
                                if (response.success){
                                    TODO: "UPPDATERA BARA DET VALADA ELEMENTET MED UPDATE FROM REACT-ADDONS-UPDATE"

                                    getCalenderEvents(context.props.bookingId).then((events) => {
                                        for (let i =0; i<events.length;i++){

                                            events[i].start=new Date(events[i].start);
                                            events[i].end=new Date(events[i].end);

                                        }
                                        context.setState({events: events})
                                    })
                                }
                            });
                            Popup.close();
                        }
                    }]
                }
            });
        } else{

            if (event.bookedBy === 1){
                Popup.create({
                title: event.title,
                content: "Are you sure you want to cancel your selected booking?",
                buttons: {
                    left: [{
                        text: 'Cancel',
                        className: 'danger',
                        action: function () {
                            Popup.close();
                        }
                    }],
                    right: [{
                        text: 'Cancel booking',
                        className: 'success',
                        action: function () {
                            unBookEvent(event.bookableAlias,moment(event.start).format("x"),Auth.getEmail()).then(response=>{
                                if (response.success){
                                    TODO: "UPPDATERA BARA DET VALADA ELEMENTET MED UPDATE FROM REACT-ADDONS-UPDATE"

                                    getCalenderEvents(context.props.bookingId).then((events) => {
                                        for (let i =0; i<events.length;i++){

                                            events[i].start=new Date(events[i].start);
                                            events[i].end=new Date(events[i].end);

                                        }
                                        context.setState({events: events})
                                    })
                                }
                            });
                            Popup.close();
                        }
                    }]
                }
            });
            }else {
                Popup.create({
                    title: event.title,
                    content: "This bookable is already  booked for this timeslot.",
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

        /*allDay
         :
         0
         bookedBy
         :
         "null"
         descr
         :
         "Laundry for residents at Byggvesta Stockholm"
         end
         :
         Mon May 15 2017 15:10:44 GMT+0200 (Västeuropa, sommartid)
         facility
         :
         "laundromat1"
         start
         :
         Mon May 15 2017 14:49:04 GMT+0200 (Västeuropa, sommartid)
         title
         :
         "Laundry"
         __proto__
         :
         Object*/


    }

    eventPropGetter (event, start, end, isSelected) {
        //var backgroundColor = '#' + event.hexColor;
        if (event.bookedBy !== null) {
            if (isSelected){
                    let style = {
                    backgroundColor: "#b30000",
                    borderColor: "#e60000"

                };
                return {
                    style: style
                };

            }else{
                let style = {
                    backgroundColor: "#ff4d4d",
                    borderColor: "#ff6666"

                };
                return {
                    style: style
                };

            }
        } else{
            if (isSelected){
                let style = {
                    backgroundColor: "#224f77",
                    borderColor:"#2d6a9f"

                };
                return {
                    style: style
                };

            }else {
                let style = {
                    backgroundColor: "#3174ad",
                    borderColor:"#3884c7"

                };
                return {
                    style: style
                };
            }
        }
}

    render() {
        return (
            <div>
                <BigCalendar
                    selectable
                    events={this.state.events}
                    onSelectEvent={this.handleSelectEvent}
                    eventPropGetter={this.eventPropGetter}
                    defaultView='week'
                    defaultDate={new Date(2017, 4, 31)}
                    scrollToTime={new Date(2017, 4, 31, 15)}
                />
            </div>

        );
    }
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
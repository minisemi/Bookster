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
import {getCalenderEvents, bookEvent} from '../utils/bookster-api'
import {PopupWindow} from './Prompt'
import {Button} from 'react-bootstrap';
import {Prompt} from './Prompt';
import Popup from 'react-popup';
import Auth from '../Auth'


// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer
//const DragAndDropCalendar = withDragAndDrop(BigCalendar);

/*const MyCalendar = props => (
 <div>
 <BigCalendar
 events={events}
 defaultDate={new Date(2015, 3, 1)}
 />
 </div>
 );*/


class BookingCalender extends Component {

    constructor (props) {
        super(props);

        this.state = {
            events: [],
        };


        //this.moveEvent = this.moveEvent.bind(this)
        this.handleSelectEvent = this.handleSelectEvent.bind(this)
    }


    componentDidMount(){
        if (this.props.bookingId!==undefined) {
            getCalenderEvents(this.props.bookingId).then((events) => {
                for (var i =0; i<events.length;i++){

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
            getCalenderEvents(nextProps.bookingId).then((events) => {
                for (var i =0; i<events.length;i++){

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

        if (event.bookedBy !== "null"){

            bookEvent(event.facility, event.start, event.end, Auth.getEmail()).then((response)=>{
               if (response.success){

               }
            });

        }
        Popup.alert('Hello, look at me');

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

    render() {
        return (
            <div>
                <BigCalendar
                    selectable
                    events={this.state.events}
                    onSelectEvent={this.handleSelectEvent}
                    defaultView='week'
                    defaultDate={new Date(2017, 4, 15)}
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
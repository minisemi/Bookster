import React, { Component } from 'react';
import '../static/BookablePage.css';
import NotFoundPage from '../components/layout/NotFoundPage';
import BookingCalender from '../components/bookablePage/BookingCalender';
import {Button, Glyphicon} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { bookablesActions } from '../data/bookables';
import { connect } from 'react-redux';
import Perf from 'react-addons-perf'

class BookablePageContainer extends Component {

    static propTypes = {
        getBookable: PropTypes.func,
        addFavourite: PropTypes.func,
        deleteFavourite: PropTypes.func,
        getBookableEvents: PropTypes.func,
        bookEvent: PropTypes.func,
        unBookEvent: PropTypes.func,
        bookable: PropTypes.object,
        bookableEvents: PropTypes.array,
        eventsErrorMessage: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.state = {
            bookable: {},
        }
    }

    componentDidUpdate() {
        console.log("update");
        console.log(this.state.bookableEvents);
    Perf.stop()
    Perf.printInclusive()
    Perf.printWasted()
  }


    componentWillReceiveProps(nextProps){
        if (nextProps.bookable !== this.props.bookable) {
            Perf.start()
            this.setState({
               bookable: nextProps.bookable,
            });
        } else if (nextProps.bookableEvents !== this.props.bookableEvents) {
            console.log("new");
           // Perf.start()
            this.setState({
               bookableEvents: nextProps.bookableEvents,
            });
        }
        else if (nextProps.match.params.id !== this.props.match.params.id) {
            this.props.getBookable(nextProps.match.params.compId, nextProps.match.params.id)
        }
    }

    componentDidMount(){
        this.props.getBookable(this.props.match.params.compId, this.props.match.params.id);
        this.props.getBookableEvents(this.props.match.params.id);
    }

    handleClick(){
        if(!this.state.bookable.favourite)
            this.props.addFavourite(this.props.match.params.id, this.props.match.params.compId);
        else
            this.props.deleteFavourite(this.props.match.params.id, this.props.match.params.compId);
    }

    render() {
        const { bookable, bookableEvents }  = this.state;
        if (!bookable) {
            return <NotFoundPage/>;
        }
        const headerStyle = { backgroundImage: `url(${bookable.cover})` };
        return (
            <div className="booking-full">
                <div className="booking">
                    <header style={headerStyle}/>
                    <div className="picture-container">
                        <img alt="" src={bookable.image}/>
                        <h2 className="name">{bookable.name}</h2>
                        <Button className="floatRight" bsStyle="warning" onClick={this.handleClick.bind(this)}>
                            {bookable.favourite ? "Remove from favourites" : "Add to favourites"}
                            <Glyphicon glyph={bookable.favourite ? "heart" : "heart-empty"} />
                        </Button>
                    </div>
                    <section className="description">
                        {bookable.info}
                    </section>
                    <BookingCalender
                        events={bookableEvents}
                        bookEvent={this.props.bookEvent}
                        unBookEvent={this.props.unBookEvent}
                        error={this.props.eventsErrorMessage}
                    />
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    bookable: state.bookables.bookable,
    bookableEvents: state.bookables.bookableEvents,
    eventsErrorMessage: state.bookables.eventsErrorMessage,
});

const mapDispatchToProps = {
    getBookable: bookablesActions.getBookable,
    addFavourite: bookablesActions.addFavourite,
    deleteFavourite: bookablesActions.deleteFavourite,
    getBookableEvents: bookablesActions.getBookableEvents,
    bookEvent: bookablesActions.bookEvent,
    unBookEvent: bookablesActions.unBookEvent,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookablePageContainer);
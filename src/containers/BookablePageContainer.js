import React, { Component } from 'react';
import '../static/BookablePage.css';
import NotFoundPage from '../components/layout/NotFoundPage';
import BookingCalender from '../components/bookablePage/BookingCalender';
import {Button, Glyphicon} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { bookablesActions } from '../data/bookables';
import { connect } from 'react-redux';


class BookablePageContainer extends Component {

    static propTypes = {
        getBookable: PropTypes.func.isRequired,
        addFavourite: PropTypes.func.isRequired,
        deleteFavourite: PropTypes.func.isRequired,
        getBookableEvents: PropTypes.func.isRequired,
        bookEvent: PropTypes.func.isRequired,
        unBookEvent: PropTypes.func.isRequired,
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

    componentWillReceiveProps(nextProps){
        if (nextProps.bookable !== this.props.bookable) {
            this.setState({
               bookable: nextProps.bookable,
            });
        } else if (nextProps.bookableEvents !== this.props.bookableEvents) {
            this.setState({
               bookableEvents: nextProps.bookableEvents,
            });
        }
        else if (nextProps.params.id !== this.props.params.id) {
            this.props.getBookable(nextProps.params.compId, nextProps.params.id)
        }
    }

    componentDidMount(){
        this.props.getBookable(this.props.params.compId, this.props.params.id);
        this.props.getBookableEvents(this.props.params.id);
    }

    handleClick(){
        if(!this.state.bookable.favourite)
            this.props.addFavourite(this.props.params.id, this.props.params.compId);
        else
            this.props.deleteFavourite(this.props.params.id, this.props.params.compId);
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
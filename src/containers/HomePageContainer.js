import React, { Component } from 'react';
import '../static/HomePageContainer.css';
import {Grid, Row} from 'react-bootstrap';
import BookingsSlideBar from '../components/BookingsSlidebar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bookablesActions } from '../data/bookables';

class HomePageContainer extends Component {

    static propTypes = {
        currentBookings: PropTypes.array,
        favourites: PropTypes.array,
        recommendations: PropTypes.array,
        getCurrentBookings: PropTypes.func.isRequired,
        getFavourites: PropTypes.func.isRequired,
        getRecommendations: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getCurrentBookings();
        this.props.getFavourites();
        this.props.getRecommendations();
    }

    render() {
        return (
            <div className="App">
                <Grid>
                    <Row>
                        <BookingsSlideBar barType="current" bookables={this.props.currentBookings}/>
                    </Row>
                    <Row>
                        <BookingsSlideBar barType="favourites" bookables={this.props.favourites}/>
                    </Row>
                    <Row>
                        <BookingsSlideBar barType="recommendations" bookables={this.props.recommendations}/>
                    </Row>
                </Grid>
            </div>
        );
    }

}

const mapStateToProps = (state) => ({
    currentBookings: state.bookables.currentBookings,
    favourites: state.bookables.favourites,
    recommendations: state.bookables.recommendations,
});

const mapDispatchToProps = {
    getCurrentBookings: bookablesActions.getCurrentBookings,
    getFavourites: bookablesActions.getFavourites,
    getRecommendations: bookablesActions.getRecommendations,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePageContainer);
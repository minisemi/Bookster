import React, { Component } from 'react';
import '../static/App.css';
import {Grid, Row} from 'react-bootstrap';
import BookingsSlideBar from './BookingsSlidebar';
import Auth from '../Auth';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bookablesActions } from '../data/bookables';

class App extends Component {

    static propTypes = {
        bookables: PropTypes.object.isRequired,
        bokningar: PropTypes.string.isRequired,
        getBookables: PropTypes.func.isRequired
    };

    componentDidMount() {
        if (this.props.bookables.bookable1 === "tvättstuga") {
            this.props.getBookables();

        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.bookables.bookable1)

    }


    render() {
        return (
            <div className="App">
                <Grid>
                    <Row>
                        <BookingsSlideBar title="My bookings" barType="current" id={Auth.getEmail()}/>
                    </Row>
                    <Row>
                        <BookingsSlideBar title="My Favourites" barType="favourites" id={Auth.getEmail()}/>
                    </Row>
                    <Row>
                        <BookingsSlideBar title="Recommendations" barType="recommendations" id={Auth.getEmail()}/>
                    </Row>
                </Grid>
            </div>
        );
    }

}

const mapStateToProps = (state) => ({
        bookables: state.bookables.bookables,
        bokningar: state.bookables.bokningar
});

const mapDispatchToProps = {
  getBookables: bookablesActions.getBookables
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;

/*export default withRouter(connect(mapStateToProps, {
    getBookables: bookablesActions.getBookables
})(App))*/

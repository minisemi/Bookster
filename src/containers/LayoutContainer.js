import React, { Component } from 'react';
import { userActions } from '../data/user';
import { searchActions } from '../data/search';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router'
import PropTypes from 'prop-types';
import Nav from '../components/layout/Nav'
import Footer from '../components/layout/Footer';
import CompanyPageContainer from './CompanyPageContainer';
import NotFoundPage from '../components/layout/NotFoundPage';
import ProfilePageContainer from './ProfilePageContainer'
import HomePageContainer from './HomePageContainer';
import BookablePageContainer from './BookablePageContainer';
import LoginPage from '../components/loginPage/LoginPage';
import '../static/Layout.css';

class LayoutContainer extends Component {

    static propTypes = {
        loggedIn: PropTypes.bool,
        searchResults: PropTypes.array,
        logOutUser: PropTypes.func.isRequired,
        getSearchResults: PropTypes.func.isRequired,
        changeRoute: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: props.loggedIn
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.loggedIn !== this.props.loggedIn) {
            this.setState({
                loggedIn: nextProps.loggedIn
            });
        }
    }

    render() {
        const { loggedIn } = this.state;
        return (
            <div>
                <Nav
                    loggedIn={loggedIn}
                    logOutUser={this.props.logOutUser}
                    getSearchResults={this.props.getSearchResults}
                    searchResults={this.props.searchResults}
                    changeRoute={this.props.changeRoute}
                />
                <div className="marginToFooter">
                    <Switch>
                        <Route exact path="/" component={loggedIn ? HomePageContainer : LoginPage} />
                        <Route path="/profile" render={() => loggedIn ? <ProfilePageContainer/> : <Redirect to="/" />} />
                        <Route path="/:compId/:id" render={({ match }) => loggedIn ? <BookablePageContainer match={match} /> : <Redirect to="/" />} />
                        <Route path="/:id" render={({ match }) => loggedIn ? <CompanyPageContainer match={match} /> : <Redirect to="/" />} />
                        <Route path="*" render={() => loggedIn ? <NotFoundPage/> : <Redirect to="/" />} />
                    </Switch>
                </div>
                <Footer/>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    loggedIn: !!state.user.user.token,
    searchResults: state.search.searchResults,
});

const mapDispatchToProps = {
    logOutUser: userActions.logOutUser,
    getSearchResults: searchActions.getSearchResults,
    changeRoute: searchActions.changeRoute,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LayoutContainer);

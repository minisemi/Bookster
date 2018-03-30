import React, { Component } from 'react';
import { userActions } from '../data/user';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router'
import Nav from './NavContainer'
import Footer from '../components/layout/Footer';
import CompanyPageContainer from './CompanyPageContainer';
import NotFoundPage from '../components/layout/NotFoundPage';
import ProfilePageContainer from './ProfilePageContainer'
import HomePageContainer from './HomePageContainer';
import BookablePageContainer from './BookablePageContainer';
import LoginPage from '../components/loginPage/LoginPage';
import '../static/Layout.css';


class LayoutContainer extends Component {

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

    checkLoggedIn(component) {
        return this.state.loggedIn ? component : <Redirect to="/" />
    }

    render() {
        const { loggedIn, logOutUser } = this.state;
        return (
            <div>
                <Nav />
                <div className="marginToFooter">
                    <Switch>
                        <Route exact path="/" component={loggedIn ? HomePageContainer : LoginPage} />
                        <Route path="/profile" render={() => loggedIn ? <ProfilePageContainer/> : <Redirect to="/" />} />
                        <Route path="/:compId/:id" render={() => loggedIn ? <BookablePageContainer/> : <Redirect to="/" />} />
                        <Route path="/:id" render={() => loggedIn ? <CompanyPageContainer/> : <Redirect to="/" />} />
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
});

const mapDispatchToProps = {
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LayoutContainer);

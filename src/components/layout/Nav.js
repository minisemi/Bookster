import React, { Component } from 'react';
import {Row, Col} from 'react-bootstrap';
import { Link } from 'react-router';
import '../../static/Nav.css';
import LogInForm from '../loginPage/LogInForm';
import BookingsSearch from '../BookingsSearch';
import Auth from '../../Auth'
import {browserHistory} from 'react-router';
import {updateToken} from '../../utils/bookster-api'
export default class Nav extends Component {

    constructor() {
        super()
        if (Auth.getToken() == null){
            this.state = { loggedIn: false};
        } else {
            this.state = { loggedIn: true};
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    /*
    Authenticates user, updates token in bookster-api and pushes to index page
     */

    handleLogin(token, email, userId){
        Auth.authenticateUser(token, email, userId)
        updateToken();
        browserHistory.push('/');
        this.setState({loggedIn:true});
    }

    /*
    deauthenticates user and redirects to /sign_in page.
     */
    handleLogout(){
        Auth.deauthenticateUser()
        browserHistory.push('/sign_in');
        this.setState({loggedIn:false});
    }

    render() {
        let bookingsSearchClass, loginFormClass;
        TODO: "Borde egentligen skapa elementen om man loggas in, istället för att dölja dem (säkerhet, prestanda osv)"
        if (!this.state.loggedIn){
            bookingsSearchClass="noDisplay"
            loginFormClass="formDisplay"
        }else {
            bookingsSearchClass="searchDisplay"
            loginFormClass="noDisplay"
        }

        return (

            <div>
                <header >
                    <Row>
                        <Col xs={12} sm={2} md={2} lg={2}>
                            <Link to={"/"} >
                                <div className="navbar-header">
                                    <h1>Bookster</h1>
                                </div>
                            </Link>
                        </Col>
                        <Col xs={12} smOffset={1} sm={6} mdOffset={1} md={6} lg={6} className={bookingsSearchClass}>
                            <BookingsSearch cleared={this.state.loggedIn} />
                        </Col>
                        <Col xs={12} sm={3}  md={3} lg={3} className={`${bookingsSearchClass} buttons`}>
                            <Link onClick={this.handleLogout} className="btn btn-danger" role="button" to={"/"} > Log out
                            </Link>
                            <Link className="btn btn-info" role="button" to={"/profile"} > Profile
                            </Link>
                        </Col>
                        <Col xs={12} sm={10} md={10} lg={10} className={loginFormClass}>
                            <ul className={`nav navbar-nav navbar-right ${loginFormClass}`}>
                                <LogInForm handleLogin={this.handleLogin} className="booksterHeaderDisplay"/>
                            </ul>
                        </Col>
                    </Row>
                </header>
            </div>

        );
    }
}


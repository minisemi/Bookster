import React, { Component } from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../static/Nav.css';
import LogInForm from '../../containers/forms/LogInFormContainer';
import BookingsSearch from '../bookables/BookingsSearch';
import PropTypes from 'prop-types';

export default class Nav extends Component {

    static propTypes = {
        logOutUser: PropTypes.func.isRequired,
        getSearchResults: PropTypes.func.isRequired,
        changeRoute: PropTypes.func.isRequired,
        loggedIn: PropTypes.bool.isRequired,
        searchResults: PropTypes.array,
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
                <header >
                    <Row>
                        <Col xs={12} sm={2} md={2} lg={2}>
                            <Link to={"/"} >
                                <div className="navbar-header">
                                    <h1>Bookster</h1>
                                </div>
                            </Link>
                        </Col>
                        { loggedIn ?
                            <div>
                                <Col xs={12} smOffset={1} sm={6} mdOffset={1} md={6} lg={6} className="searchDisplay">
                                    <BookingsSearch
                                        cleared={loggedIn}
                                        getSearchResults={this.props.getSearchResults}
                                        suggestions={this.props.searchResults}
                                        changeRoute={this.props.changeRoute}
                                    />
                                </Col>
                                <Col xs={12} sm={3} md={3} lg={3} className={"searchDisplay buttons"}>
                                    <Button onClick={this.props.logOutUser} className="btn btn-danger floatRight marginRight">
                                        Log out
                                    </Button>
                                    <Link className="btn btn-info floatRight" role="button" to={"/profile"}> Profile
                                    </Link>
                                </Col>
                            </div>
                            :
                            <Col xs={12} sm={10} md={10} lg={10}>
                                <LogInForm className="navbar-right"/>
                            </Col>
                        }
                    </Row>
                </header>
            </div>
        );
    }
}

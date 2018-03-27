import React, { Component } from 'react';
import {Row, Col} from 'react-bootstrap';
import { Link } from 'react-router';
import '../static/Nav.css';
import LogInForm from './LogInFormContainer';
import BookingsSearch from '../components/bookables/BookingsSearch';
import PropTypes from 'prop-types';
import { userActions } from '../data/user';
import { connect } from 'react-redux';

class NavContainer extends Component {

    static propTypes = {
        logOutUser: PropTypes.func.isRequired,
        user: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.state = {
          user: props.user
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user !== this.props.user) {
            this.setState({
                user: nextProps.user
            });
        }
    }

    render() {
        const { user, logOutUser } = this.props;

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
                        { user ?
                            <div>
                                <Col xs={12} smOffset={1} sm={6} mdOffset={1} md={6} lg={6} className="searchDisplay">
                                    <BookingsSearch cleared={user}/>
                                </Col>
                                <Col xs={12} sm={3} md={3} lg={3} className={"searchDisplay buttons"}>
                                    <Link onClick={logOutUser} className="btn btn-danger floatRight marginRight"
                                          role="button" to={"/"}> Log out
                                    </Link>
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

const mapStateToProps = (state) => ({
    user: state.user.user,
});

const mapDispatchToProps = {
    logOutUser: userActions.logOutUser,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavContainer);

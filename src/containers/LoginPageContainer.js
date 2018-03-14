import React, { Component } from 'react';
import CarouselShower from '../components/loginPage/CarouselShower';
import SignUpForm from '../components/loginPage/SignUpForm'
import {Row, Col} from 'react-bootstrap';
import '../static/Login.css'
import PropTypes from 'prop-types';
import { userActions } from '../data/user';
import { connect } from 'react-redux';

class LoginPageContainer extends Component {

    static propTypes = {
        deleteFavourite: PropTypes.func.isRequired,
        bookable: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.state = {
            bookable: {},
        }
    }

    render() {

        return (
            <Row className="loginPositioning">
                <Col xs={12} sm={12} md={6} lg={6}>
                    <CarouselShower/>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6}>
                    <SignUpForm/>
                </Col>
            </Row>
        );
    }
}
const mapStateToProps = (state) => ({
    company: state.user.company,
});

const mapDispatchToProps = {
    getCompany: userActions.getCompany,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPageContainer);



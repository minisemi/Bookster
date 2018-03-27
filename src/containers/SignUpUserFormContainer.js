import React, { Component } from 'react';
import {Row, Col, Form, FormGroup, Button, FormControl, Alert} from 'react-bootstrap';
import '../static/SignUpForm.css'
import {signUpValidate} from '../components/forms/Validation';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import { userActions } from '../data/user';
import { connect } from 'react-redux';
import FormInput  from '../components/forms/FormInput';
var timeout= null;



class SignUpUserFormContainer extends Component {

    constructor(props){
        super(props);
        this.state = {}
    }

    normalizeDate = (value) => {
        if (!value) {
            return value
        }
        const month = (value.getMonth()+1<10) ? "0"+String(value.getMonth()+1) : String(value.getMonth()+1);
        const date = (value.getDate()<10) ? "0"+String(value.getDate()) : String(value.getDate());
        return String(value.getFullYear())+"-"+month+"-"+date;
    };

    render() {
        const { error, handleSubmit, pristine, reset, submitting, signUpUser } = this.props;
        return (
                <Form horizontal className="form" onSubmit={ handleSubmit(signUpUser)}>
                    <Col sm={6}>
                        <Field
                            name="firstName"
                            component={FormInput}
                            type="text"
                            placeholder="First Name"
                            required={true}
                            child={"editText"}
                        />
                    </Col>
                    <Col sm={6}>
                        <Field
                            name="surName"
                            component={FormInput}
                            type="text"
                            placeholder="Last Name"
                            required={true}
                            child={"editText"}
                        />
                    </Col>
                    <Col sm={12}>
                        <Field
                            name="email"
                            component={FormInput}
                            type="email"
                            placeholder="Email"
                            required={true}
                            child={"editText"}
                        />
                    </Col>
                    <Col sm={12}>
                        <Field
                            name="password"
                            component={FormInput}
                            type="password"
                            placeholder="Password"
                            required={true}
                            child={"editText"}
                        />
                    </Col>
                    <Col sm={12}>
                        <Field
                            name="repeatPassw"
                            component={FormInput}
                            type="password"
                            placeholder="Repeat Password"
                            required={true}
                            child={"editText"}
                        />
                    </Col>
                    <Row>
                        <Col sm={8} style={{ paddingLeft: "0" }}>
                            <Field
                                name="birthdate"
                                component={FormInput}
                                required={true}
                                child={"dateTimePicker"}
                                normalize={this.normalizeDate}
                            />
                        </Col>
                        <Col sm={4} style={{ paddingRight: "0" }}>
                            <Button
                                style={{ float: "right" }}
                                type="submit"
                                value="Submit"
                                disabled={submitting}>
                                Create account
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        {error ? <Alert bsStyle="danger" style={{ marginTop: "10px" }}> {error}</Alert> : null}
                    </Row>
                </Form>
        );
    }
}

SignUpUserFormContainer = reduxForm({
    form: 'signup',
    validate: signUpValidate,
})(SignUpUserFormContainer);

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
    signUpUser: userActions.signUpUser,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUpUserFormContainer);

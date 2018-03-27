import React, { Component } from 'react';
import {Row, Col, Form, FormGroup, Button, FormControl, Alert} from 'react-bootstrap';
import '../../static/SignUpForm.css'
import { signUpValidate, normalizeDate } from '../../utils/Validation';
import { reduxForm, Field } from 'redux-form';
import { userActions } from '../../data/user';
import { connect } from 'react-redux';
import FormInput  from '../../components/forms/FormInput';
import UserInfoFields  from '../../components/forms/UserInfoFields';
import PasswordFields  from '../../components/forms/PasswordFields';
import PropTypes from 'prop-types';

class SignUpUserFormContainer extends Component {

    static propTypes = {
        signUpUser: PropTypes.func.isRequired,
    };

    constructor(props){
        super(props);
        this.state = {}
    }

    render() {
        const { error, handleSubmit, submitting, signUpUser } = this.props;
        return (
                <Form horizontal className="form" onSubmit={ handleSubmit(signUpUser)}>
                    <UserInfoFields />
                    <PasswordFields />
                    <Row>
                        <Col sm={8} style={{ paddingLeft: "0" }}>
                            <Field
                                name="birth"
                                component={FormInput}
                                required={true}
                                child={"dateTimePicker"}
                                normalize={normalizeDate}
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

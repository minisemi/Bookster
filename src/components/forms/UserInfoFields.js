import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Col } from 'react-bootstrap';
import FormInput  from '../../components/forms/FormInput';

export default class UserInfoFields extends Component {

    render() {
        return(
            <div>
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
                        name="familyName"
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
            </div>
        );
    }

}
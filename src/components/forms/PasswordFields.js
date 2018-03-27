import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Col } from 'react-bootstrap';
import FormInput  from '../../components/forms/FormInput';

export default class PasswordFields extends Component {

    render() {
        return(
            <div>
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
            </div>
        );
    }

}
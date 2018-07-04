import React, { Component } from 'react';
import { Row, Col, Form, Button, Alert, ProgressBar } from 'react-bootstrap';
import '../../static/ProfilePage.css'
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import PasswordFields  from '../../components/forms/PasswordFields';
import FormInput  from '../../components/forms/FormInput';
import PropTypes from 'prop-types';
import { userActions } from '../../data/user';
import { changePasswordValidate } from '../../utils/Validation';

class ChangePasswordFormContainer extends Component {

    static propTypes = {
        changePassword: PropTypes.func,
    };

    constructor (props) {
        super(props);
    }

    render() {
        const { error, handleSubmit, reset, pristine, submitting, changePassword, submitSucceeded } = this.props;
        return (
            <Form horizontal className="form" onSubmit={handleSubmit(changePassword)}>
                <Col sm={12}>
                    <Field
                        name="oldPassword"
                        component={FormInput}
                        required={true}
                        type="password"
                        placeholder="Old password"
                        child={"editText"}
                    />
                </Col>
                <PasswordFields />
                <Row>
                {submitting ?
                    <ProgressBar active now={50} />
                    :
                    pristine ||
                    <div>
                        <Button
                            style={{ float: "right" }}
                            type="submit"
                            bsStyle="success"
                            disabled={submitting}
                        >
                            Update
                        </Button>
                        <Button
                            style={{ float: "right" }}
                            disabled={submitting}
                            bsStyle="warning"
                            onClick={reset}
                        >
                            Cancel
                        </Button>
                    </div>
                }
                </Row>
                <Row>
                {error ? <Alert bsStyle="danger" style={{ marginTop: "10px" }}> {error}</Alert> : null}
                {submitSucceeded ?
                    <Alert bsStyle="success" style={{ marginTop: "10px" }}>
                        Password changed!
                    </Alert>
                    :
                    null
                }
                </Row>
            </Form>
        );
    }
}

ChangePasswordFormContainer = reduxForm({
    form: 'userPassword',
    validate: changePasswordValidate,
})(ChangePasswordFormContainer);

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
    changePassword: userActions.changePassword,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangePasswordFormContainer);



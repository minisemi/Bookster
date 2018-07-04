import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';
import Modal from '../../components/layout/MessageModal'
import { userActions } from '../../data/user';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import FormInput  from '../../components/forms/FormInput';

class LogInFormContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            showModal: !!props.error,
        };
        this.onModalClose = this.onModalClose.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.error){
            // Set bodyText because autofill in chrome will reset password to saved password when modal pops
            this.setState({
                showModal: !!nextProps.error,
                bodyText: nextProps.error
            });
        }
    }

    onModalClose() {
        //event.preventDefault()
        this.props.clearSubmitErrors("login");
        this.setState({
            showModal: false
        })
    }

    render() {
        const { handleSubmit, submitting, logInUser, className } = this.props;
        return (
            <div className={className}>
                <Form inline onSubmit={ handleSubmit(logInUser) }>
                    <Field
                            name="email"
                            component={FormInput}
                            type="email"
                            placeholder="Email"
                            required={true}
                            child={"editText"}
                        />
                    {' '}
                    <Field
                            name="password"
                            component={FormInput}
                            type="password"
                            placeholder="Password"
                            required={true}
                            child={"editText"}
                        />
                    {' '}
                    <Button type="submit" value="Submit" disabled={submitting}>
                        Sign in
                    </Button>
                    <Modal
                        show={this.state.showModal}
                        handler={this.onModalClose}
                        title="Wrong credentials"
                        body={this.state.bodyText}
                        buttonText="Try again"
                    />
                </Form>
            </div>
        );
    }
}

LogInFormContainer = reduxForm({
    form: 'login',
})(LogInFormContainer);

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
    logInUser: userActions.logInUser,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LogInFormContainer);
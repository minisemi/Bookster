
import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';
import Modal from '../components/loginPage/SignUpModal'
import { logInUser } from '../utils/auth-api';
import { userActions } from '../data/user';
import {loginValidate} from '../components/forms/Validation';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import FormInput  from '../components/forms/FormInput';

class LogInFormContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            formValues: {},
            loggedIn: false,
            formValidation:{},
            visibility:"hiddenAlert",
            showModal:false
        }
    }
    handleChange(event){
        event.preventDefault();
        let formValues = this.state.formValues;
        let name = event.target.name;
        let value = event.target.value;

        formValues[name] = value;

        this.setState({formValues})
    }

    handleSubmit(event) {
        event.preventDefault();
        logInUser(this.state.formValues).then((response) => {
            this.setState({loggedIn:response.success})
            if (response.success){
                this.props.handleLogin(response.token, this.state.formValues.email, response.userId);
            }
            else{
                this.setState({showModal:true})
            }
        });
    }

    handler(e) {
        e.preventDefault()
        this.setState({
            showModal: false
        })
    }


    render() {
        const {error, handleSubmit, pristine, reset, submitting} = this.props;
        return (
            <div className="loginForm">
                <Form inline onSubmit={ handleSubmit(userActions.logInUser) }>
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
                    <Modal showBol={this.state.showModal} handler={this.handler.bind(this)} email={this.state.formValues.email}/>
                </Form>
            </div>
        );
    }
}

LogInFormContainer = reduxForm({
    form: 'login',
    validate: loginValidate,
})(LogInFormContainer);

const mapStateToProps = (state) => ({
    company: state.user.company,
});

const mapDispatchToProps = {
    //signUpUser: userActions.signUpUser,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LogInFormContainer);
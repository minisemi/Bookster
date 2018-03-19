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

    static propTypes = {
        signUpUser: PropTypes.func.isRequired,
        bookable: PropTypes.object,
    };

    constructor(props){
        super(props);
        this.state = {
            formValues: {},
            formValidation:{},
            message: "",
            visibility:"hiddenAlert",
            buttonEnabled:true
        }
    }

    /*handleChange(event){
     event.preventDefault();
     let formValues = this.state.formValues;
     let name = event.target.name;
     let value = event.target.value;
     formValues[name] = value;
     this.setState({formValues}, "")
     }*/

    /*instantCheck(event){
     event.persist();
     this.handleChange(event);
     clearTimeout(timeout);
     timeout = setTimeout(Validation.feedback, 500,this, event);
     }*/

    /*handler(e) {
     e.preventDefault()
     this.setState({
     })
     }*/


    renderField ({input, label, type, meta: {touched, error, warning}}) {
        return (
            <div>
                <label>{label}</label>
                <div>
                    <input {...input} placeholder={label} type={type} />
                    {touched &&
                    ((error && <span>{error}</span>) ||
                    (warning && <span>{warning}</span>))}
                </div>
            </div>
        )};


    renderFormControl = (field) => (
        <FormGroup controlId={field.name}>
            <FormControl {...field.input} placeholder={field.placeholder} type={field.type} name={field.name} value={field.input.value}/>
            <FormControl.Feedback />
        </FormGroup>
    );

    render() {
        const {error, handleSubmit, pristine, reset, submitting} = this.props;
        console.log("error");
        console.log(error);
        return (
            <div>
                <Form horizontal className="form" onSubmit={ handleSubmit(this.props.signUpUser)}>
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
                            name="passw"
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
                        {error && <strong>{error}</strong>}
                        <Alert className={`formAlert ${this.state.visibility}`} > {this.state.message}</Alert>
                    </Row>
                </Form>
            </div>
        );
    }
}

SignUpUserFormContainer = reduxForm({
    form: 'signIn',
    validate: signUpValidate,
})(SignUpUserFormContainer);

const mapStateToProps = (state) => ({
    company: state.user.company,
});

const mapDispatchToProps = {
    signUpUser: userActions.signUpUser,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUpUserFormContainer);

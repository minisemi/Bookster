import React, { Component } from 'react';
import {Row, Col, Form, FormGroup, Button, FormControl, Alert} from 'react-bootstrap';
import '../static/SignUpForm.css'
import { signUpUser } from '../utils/auth-api';
import {signUpValidate} from '../components/forms/Validation';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import 'react-widgets/dist/css/react-widgets.css';
import { userActions } from '../data/user';
import { connect } from 'react-redux';
import FormInput  from '../components/forms/FormInput';
var timeout= null;

Moment.locale('en');
momentLocalizer(Moment);

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

    handleSubmit(event) {
        //this.signUpUser();

        /*event.preventDefault();
         signUpUser(this.state.formValues).then((message) => {
         var vis = "";
         if (message==="Signed up!") {
         Validation.clearVals(this.state.formValidation)
         vis="alert-success"
         }else{
         vis="alert-danger"
         if (message==="User already exists") {
         let formVal = this.state.formValidation
         formVal["email"]= "error";
         }
         }
         this.setState({visibility: vis, message: message});
         });*/
    }

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

    renderDateTimePicker = ({ input: { onChange, value }, showTime }) => {
        return <DateTimePicker
            onChange={onChange}
            format="YYYY-MM-DD"
            time={showTime}
            value={!value ? null : new Date(value)}
            className="datePicker"
        />;
    };



    render() {
        const {error, handleSubmit, pristine, reset, submitting} = this.props;
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
                        />
                    </Col>
                    <Col sm={6}>
                        <Field
                            name="surName"
                            component={FormInput}
                            type="text"
                            placeholder="Last Name"
                            required={true}
                        />
                    </Col>
                    <Col sm={12}>
                        <Field
                            name="email"
                            component={FormInput}
                            type="email"
                            placeholder="Email"
                            required={true}
                        />
                    </Col>
                    <Col sm={12}>
                        <Field
                            name="passw"
                            component={FormInput}
                            type="password"
                            placeholder="Password"
                            required={true}
                        />
                    </Col>
                    <Col sm={12}>
                        <Field
                            name="repeatPassword"
                            component={FormInput}
                            type="password"
                            placeholder="Repeat Password"
                            required={true}
                        />
                    </Col>
                    <Row>
                        <Field
                            name="birth"
                            showTime={false}
                            component={this.renderDateTimePicker}
                            required={true}
                        />
                        <Button
                            className="signUpButton"
                            type="submit"
                            value="Submit"
                            disabled={submitting}>
                            Create account
                        </Button>
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

//FLYTTA VALIDATE, WARN, RENDERFIELD OSV TILL CONSTANTS.
// IMPORTERA DESSA SEDAN TILL BÅDE SIGNUPUSERFORM OCH SIGNUPCOMPANYFORM

const validate = values => {
    const errors = {};
    if (!values.username) {
        errors.username = 'Required'
    } else if (values.username.length > 15) {
        errors.username = 'Must be 15 characters or less'
    }
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if (!values.age) {
        errors.age = 'Required'
    } else if (isNaN(Number(values.age))) {
        errors.age = 'Must be a number'
    } else if (Number(values.age) < 18) {
        errors.age = 'Sorry, you must be at least 18 years old'
    }
    return errors
};

const warn = values => {
    const warnings = {};
    if (values.age < 19) {
        warnings.age = 'Hmm, you seem a bit young...'
    }
    return warnings
};

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
SignUpUserFormContainer = reduxForm({
    form: 'signIn',
    validate: signUpValidate, // <--- validation function given to redux-form
    //asyncBlurFields: ['email'],
    //warn // <--- warning function given to redux-form // a unique identifier for this form
})(SignUpUserFormContainer);

const mapStateToProps = (state) => ({
    company: state.user.company,
});

const mapDispatchToProps = {
    signUpUser: userActions.signUpUser,
};


// You have to connect() to any reducers that you wish to connect to yourself
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUpUserFormContainer);


/*export default reduxForm({
 form: 'signIn',
 validate, // <--- validation function given to redux-form
 warn // <--- warning function given to redux-form
 })(SignUpFormContainer);*/

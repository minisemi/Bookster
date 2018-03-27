import React, { Component } from 'react';
import '../../static/BookingsSlideBar.css';
import { Alert, Form, Button, Col, Row } from 'react-bootstrap';
import { signUpValidate, normalizeDate } from '../../utils/Validation';
import { userActions } from '../../data/user';
import '../../static/ProfilePage.css'
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import UserInfoFields  from '../../components/forms/UserInfoFields';
import FormInput  from '../../components/forms/FormInput';
import PropTypes from 'prop-types';

class UserInfoFormContainer extends Component {

    static propTypes = {
        getUserInfo: PropTypes.func.isRequired,
        updateUserInfo: PropTypes.func.isRequired,
        initialValues: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.state =
            {   info:
                {email: "", firstName: "", familyName: "", birth: ""
                },
                formValidation:{},
                editable: true,
                buttonText:"Edit",
                message:"",
                visibility: "hiddenAlert",
                buttonEnabled : true
            };
    }

    /*handleEdit(event){
        event.preventDefault()
        if (this.state.editable){
            this.setState({info:this.state.info,buttonText:"Save", editable:!this.state.editable})
        }
        else {

            if(changeOccured) {
                var email = this.state.info.email;
                updateUserInfo(this.state.info).then((message) => {
                    var formValid = this.state.formValidation
                    if (message.message==="success") {
                        Auth.switchCred(message.token, email)
                        updateToken();
                        Validation.clearVals(formValid)
                        this.setState({info:this.state.info,buttonText:"Edit", editable:!this.state.editable, formValid})
                    }
                    else{
                        formValid["email"]= "error"
                        this.setState({visibility:"alert-danger", message: message.message, formValid})
                    }
                });
            }else{
                this.setState({buttonText:"Edit", editable:!this.state.editable})
            }
        }
    }

    handleChange (event){
        var info = this.state.info;
        info[event.target.name]=event.target.value;
        this.setState({info, editable: this.state.editable})
        changeOccured = true;

    }

    handleValidation (event){
        event.persist();
        this.handleChange(event);

        clearTimeout(timeout);
        timeout = setTimeout(Validation.feedback, 500,this, event);
    }

    loadInfo(){
        getUserInfo().then((response) => {
            this.setState({info: response,
                editable:true});
        });
    }*/

    componentWillReceiveProps(nextProps){
        if(nextProps.initialValues !== this.props.initialValues){
            this.setState({
                initialValues: nextProps.initialValues,
            });
        }
    }

    componentDidMount() {
        if(!this.props.initialValues){
            this.props.getUserInfo();
        }
    }

    // LÄGG TILL ERRORHANTERING OCH FIXA UPDATE VALUES

    render() {
        const { error, handleSubmit, pristine, reset, submitting, updateUserInfo } = this.props;
        return (
               <Form horizontal className="form" onSubmit={ handleSubmit(updateUserInfo)}>
                    <UserInfoFields />
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
                                Update
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        {error ? <Alert bsStyle="danger" style={{ marginTop: "10px" }}> {error}</Alert> : null}
                    </Row>
                </Form>
        );
    }
    /*render() {
        return (
                <Form  onSubmit={ this.handleEdit.bind(this)}>
                    <FormGroup validationState={this.state.formValidation.firstName}>First name<FormControl type="text" required={true} className="formControl" disabled={this.state.editable} value={this.state.info.firstName || ""} name="firstName"
                                                                                                            onChange={this.handleChange.bind(this)}/></FormGroup>
                    <FormGroup validationState={this.state.formValidation.familyName}>Last name<FormControl className="formControl" required={true} type="text" disabled={this.state.editable} value={this.state.info.familyName || ""} name="familyName"
                                                                                                            onChange={this.handleChange.bind(this)}/></FormGroup>
                    <FormGroup  validationState={this.state.formValidation.email}>Email<FormControl className="formControl" required={true} type="email" disabled={this.state.editable} value={this.state.info.email || ""} name="email"
                                                                                                    onChange={this.handleValidation.bind(this)}/><FormControl.Feedback /></FormGroup>
                    <FormGroup validationState={this.state.formValidation.address}>Address<FormControl type="text" required={true} disabled={this.state.editable} className="formControl" value={this.state.info.address || ""} name="address"
                                                                                                       onChange={this.handleChange.bind(this)}/></FormGroup>
                    <FormGroup validationState={this.state.formValidation.birth}>Birthday<FormControl className="formControl" required={true} type="text" disabled={this.state.editable} value={this.state.info.birth || ""} name="birth"
                                                                                                      onChange={this.handleValidation.bind(this)}/><FormControl.Feedback /></FormGroup>
                    <Button className="floatRight" bsStyle="warning" type="submit" disabled={!this.state.buttonEnabled} >{this.state.buttonText}</Button>
                </Form>
                <Alert className={`formAlert ${this.state.visibility}`} > {this.state.message}</Alert>
        );
    }*/
}

UserInfoFormContainer = reduxForm({
    form: 'userInfo',
    validate: signUpValidate,
})(UserInfoFormContainer);

const mapStateToProps = (state) => ({
    initialValues: state.user.user.data,
});

const mapDispatchToProps = {
    updateUserInfo: userActions.updateUserInfo,
    getUserInfo: userActions.getUserInfo,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserInfoFormContainer);


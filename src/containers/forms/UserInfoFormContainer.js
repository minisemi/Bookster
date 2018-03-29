import React, { Component } from 'react';
import '../../static/BookingsSlideBar.css';
import { Alert, Form, Button, Col, Row, ProgressBar } from 'react-bootstrap';
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
        getUserInfo: PropTypes.func,
        updateUserInfo: PropTypes.func,
        initialValues: PropTypes.object,
        userInfoMessage: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.state =
            {
                showSuccessAlert: false,
            };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.userInfoMessage !== this.props.userInfoMessage && nextProps.userInfoMessage){
            this.setState({
                showSuccessAlert: true,
            });
        }
    }

    componentDidMount() {
        if(!this.props.initialValues){
            this.props.getUserInfo();
        }
    }

    render() {
        const { error, handleSubmit, reset, pristine, submitting, updateUserInfo, userInfoMessage } = this.props;
        return (
            <Form horizontal className="form" onSubmit={ handleSubmit(updateUserInfo)}>
                <UserInfoFields />
                <Row>
                    <Col sm={6} style={{ paddingLeft: "0" }}>
                        <Field
                            name="birth"
                            component={FormInput}
                            required={true}
                            child={"dateTimePicker"}
                            normalize={normalizeDate}
                        />
                    </Col>
                    <Col sm={6} style={{ paddingRight: "0" }}>
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
                                    onClick={()=>{this.setState({ showSuccessAlert: false })}}
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
                    </Col>
                </Row>
                <Row>
                    {error ? <Alert bsStyle="danger" style={{ marginTop: "10px" }}> {error}</Alert> : null}
                    {this.state.showSuccessAlert ?
                        <Alert bsStyle={userInfoMessage.type} style={{ marginTop: "10px" }}>
                            {userInfoMessage.message}
                        </Alert>
                        :
                        null
                    }
                </Row>
            </Form>
        );
    }
}

UserInfoFormContainer = reduxForm({
    form: 'userInfo',
    validate: signUpValidate,
})(UserInfoFormContainer);

const mapStateToProps = (state) => ({
    initialValues: state.user.user.data,
    enableReinitialize : true,
    userInfoMessage: state.user.userInfoMessage,
});

const mapDispatchToProps = {
    updateUserInfo: userActions.updateUserInfo,
    getUserInfo: userActions.getUserInfo,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserInfoFormContainer);


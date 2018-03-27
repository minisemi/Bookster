import axios from 'axios';
import {SubmissionError} from 'redux-form'
const BASE_URL = 'http://localhost:3333/auth';
export const LOG_OUT_USER = 'LOG_OUT_USER';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const SET_USER = 'SET_USER';
import Auth from '../../Auth'
import {browserHistory} from 'react-router';
import {updateToken} from '../../utils/bookster-api'
import {loginValidate} from '../../utils/Validation';
import _isEmpty from 'lodash/isEmpty';

export function signUpUser(formValues) {
    return (dispatch, getState) => {
        console.log(formValues);
        const url = `${BASE_URL}/signup`;
        return axios.post(url, {
            email: formValues.email.toString(),
            firstName: formValues.firstName.toString(),
            familyName: formValues.familyName.toString(),
            password: formValues.password.toString(),
            birth: formValues.birth.toString()
        }).then(response => {
            finalizeLogin(dispatch, { token: response.data.token, data: response.data.user })
        }).catch(error => {
            const response = error.response || {};
            if (response.status === 422) {
                throw new SubmissionError({email: error.response.data})
            } else {
                throw new SubmissionError({_error: 'Error creating account. Please contact customer support.'})
            }
        });
    }
}

export function logInUser(form){
    return (dispatch, getState) => {
        const validationErrors = loginValidate(form);
        if(!_isEmpty(validationErrors)){
            throw new SubmissionError({ _error: validationErrors.email || validationErrors.password })
        } else {

            const url = `${BASE_URL}/signin`;
            return axios.post(url,{
                email: form.email,
                password: form.password
            }).then(response => {
                finalizeLogin(dispatch, { token: response.data.token, data: response.data.user });
            }).catch(function (error) {
                const response = error.response || {};
                if(response.status === 403) {
                    throw new SubmissionError({ _error: error.response.data })
                } else {
                    throw new SubmissionError({ _error: 'Error logging in. Please contact customer support.' })
                }
            });
        }
    }
}

export function logOutUser(){
    return (dispatch, getState) => {
        Auth.deauthenticateUser();
        dispatch({
            type: LOG_OUT_USER,
        });
        browserHistory.push('/sign_in');
    }
}

function finalizeLogin(dispatch, user) {
    Auth.authenticateUser(user.token, user.data.email, user.data.id)
    updateToken();
    dispatch({
        type: SET_USER,
        payload: user
    });
    browserHistory.push('/');
}

export function changePassword(oldPassword, newPassword, token) {
    return (dispatch, getState) => {
        const url = `${BASE_URL}/change_pw`;
        axios.post(url, {
                oldPassword: oldPassword,
                newPassword: newPassword
            },
            {
                headers: {Authorization: `Bearer ${token}`}
            }).then(response => {
            dispatch({
                type: CHANGE_PASSWORD,
                payload: response.data
            })
        }).catch(function (error) {
            console.log(error);
        });
    }
}

export function updateUserInfo (formValues){
    return (dispatch, getState) => {
        const url = `${BASE_URL}/api/update_user`;
        return axios.post(url,formValues).then(response => {
            dispatch({
                type: SET_USER,
                payload: response.data.user
            })
        }).catch(function (error) {
            const response = error.response || {};
            if(response.status === 403) {
                throw new SubmissionError({ _error: error.response.data })
            } else {
                throw new SubmissionError({ _error: 'Error logging in. Please contact customer support.' })
            }
        });
    }
}

export function getUserInfo (){
    return (dispatch, getState) => {
        const url = `${BASE_URL}/api/get_user`;
        return axios.get(url,
            {headers:{
                Authorization: `JWT ${Auth.getToken()}`
            }}).then(response => {
            dispatch({
                type: SET_USER,
                payload: response.data.user
            })
        }).catch(function (error) {
            const response = error.response || {};
            if(response.status === 403) {
                throw new SubmissionError({ _error: error.response.data })
            } else {
                throw new SubmissionError({ _error: 'Error logging in. Please contact customer support.' })
            }
        });
    }
}
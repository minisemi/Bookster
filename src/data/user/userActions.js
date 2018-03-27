import axios from 'axios';
import {SubmissionError} from 'redux-form'
const BASE_URL = 'http://localhost:3333/auth';
export const LOG_IN_USER = 'LOG_IN_USER';
export const LOG_OUT_USER = 'LOG_OUT_USER';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
import Auth from '../../Auth'
import {browserHistory} from 'react-router';
import {updateToken} from '../../utils/bookster-api'
import {loginValidate} from '../../components/forms/Validation';
import _isEmpty from 'lodash/isEmpty';

export function signUpUser(formValues) {
    return (dispatch, getState) => {
        console.log(formValues);
        const url = `${BASE_URL}/signup`;
        return axios.post(url, {
            email: formValues.email.toString(),
            firstName: formValues.firstName.toString(),
            surName: formValues.surName.toString(),
            password: formValues.password.toString(),
            birth: formValues.birthdate.toString()
        }).then(response => {
            finalizeLogin(dispatch, { ...response.data, email: formValues.email })
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
                finalizeLogin(dispatch, { ...response.data, email: form.email });
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
    Auth.authenticateUser(user.token, user.email, user.id)
    updateToken();
    dispatch({
        type: LOG_IN_USER,
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
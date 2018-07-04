import axios from 'axios';
import {SubmissionError} from 'redux-form'
const BASE_URL = 'http://localhost:3333';
export const LOG_OUT_USER = 'LOG_OUT_USER';
export const SET_USER = 'SET_USER';
export const SET_USER_INFO_MESSAGE = 'SET_USER_INFO_MESSAGE';
import Auth from '../../Auth'
import {loginValidate} from '../../utils/Validation';
import _isEmpty from 'lodash/isEmpty';
// Sets token as axios default header 
axios.defaults.headers.common['Authorization'] = `Bearer ${Auth.getToken()}`;
import Perf from 'react-addons-perf'


export function signUpUser(formValues) {
    return (dispatch, getState) => {
        const url = `${BASE_URL}/auth/signup`;
        return axios.post(url, {
            email: formValues.email.toString(),
            firstName: formValues.firstName.toString(),
            familyName: formValues.familyName.toString(),
            password: formValues.password.toString(),
            birth: formValues.birth.toString()
        }).then(response => (
            finalizeLogin(dispatch, { token: response.data.token, data: response.data.user })
            )).catch(error => {
            const response = error.response || {};
            if (response.status === 422) {
                throw new SubmissionError({email: response.data})
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

            const url = `${BASE_URL}/auth/signin`;
            return axios.post(url,{
                email: form.email,
                password: form.password
            }).then(response => (
                finalizeLogin(dispatch, { token: response.data.token, data: response.data.user })
                )).catch(function (error) {
                const response = error.response || {};
                if(response.status === 403) {
                    throw new SubmissionError({ _error: response.data })
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
        return dispatch({
            type: LOG_OUT_USER,
        });
    }
}

function updateToken(){
    axios.defaults.headers.common['Authorization'] = `Bearer ${Auth.getToken()}`;
}

function finalizeLogin(dispatch, user) {
    Auth.authenticateUser(user.token, user.data.email, user.data.id);
    updateToken();
    return dispatch({
        type: SET_USER,
        payload: user
    });
}

export function changePassword(formValues) {
    return (dispatch, getState) => {
        const url = `${BASE_URL}/auth/change_pw`;
        return axios.post(url, {
                oldPassword: formValues.oldPassword,
                newPassword: formValues.password
            },
            {
                headers: {Authorization: `Bearer ${getState().user.user.token}`}
            }).then(response => {
        }).catch(function (error) {
            const response = error.response || {};
            if(response.status === 403) {
                throw new SubmissionError({ oldPassword: response.data })
            } else {
                throw new SubmissionError({ _error: 'Error updating password. Please contact customer support.' })
            }
        });
    }
}

export function updateUserInfo (formValues){
    return (dispatch, getState) => {
        dispatch({
                type: SET_USER_INFO_MESSAGE,
                payload: undefined
            });
        const url = `${BASE_URL}/api/update_user`;
        return axios.post(url,formValues).then(response => {
            Auth.authenticateUser(response.data.token, response.data.data.email);
            dispatch({
                type: SET_USER,
                payload: response.data
            });
            return dispatch({
                type: SET_USER_INFO_MESSAGE,
                payload: { type: "success", message: "Update successful!" }
            })
        }).catch(function (error) {
            const response = error.response || {};
            if(response.status === 422) {
                throw new SubmissionError({ _error: response.data })
            } else {
                throw new SubmissionError({ _error: 'Error updating user info. Please contact customer support.' })
            }
        });
    }
}

export function getUserInfo (){
    return (dispatch, getState) => {
        const url = `${BASE_URL}/api/get_user`;
        const token = Auth.getToken();
        return axios.get(url,
            {headers:{
                Authorization: `JWT ${token}`
            }}).then(response => {

            return dispatch({
                type: SET_USER,
                payload: {token, data: response.data}
            })
        }).catch(function (error) {
            return dispatch({
                type: SET_USER_INFO_MESSAGE,
                payload: { type: "danger", message: "Error retrieving info."}
            })
        });
    }
}
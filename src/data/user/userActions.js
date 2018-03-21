import axios from 'axios';
import {SubmissionError} from 'redux-form'
const BASE_URL = 'http://localhost:3333/auth';
export const SIGN_UP_USER = 'SIGN_UP_USER';
export const LOG_IN_USER = 'LOG_IN_USER';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
import Auth from '../../Auth'
import {browserHistory} from 'react-router';
import {updateToken} from '../../utils/bookster-api'

/*export function signUpUser(formValues) {
    return (dispatch, getState) => {
        console.log(formValues);
        const url = `${BASE_URL}/signup`;

        axios.post(url, {
            email: formValues.email.toString(),
            firstName: formValues.firstName.toString(),
            surName: formValues.surName.toString(),
            passw: formValues.passw.toString(),
            birth: formValues.birthdate.toString()
        }).then(response => {
            console.log("response.data");
            console.log(response.data);
            if(response.data.message){
                dispatch({
                    type: SIGN_UP_USER,
                    payload: response.data.message
                })
            } /*else if(response.data.email) {
                console.log("throw");
                throw new SubmissionError({ email: 'User already exists', _error: 'Signup failed' })
            }

        }).catch(error => {
            // how you pass server-side validation errors back is up to you
            console.log("error");
            console.log(error);
            if(error) {
                console.log("throw");
                throw new SubmissionError({ email: 'User already exists', _error: 'Signup failed' })
            } else {
                // what you do about other communication errors is up to you
            }
        });
    };
}*/

export function signUpUser(formValues) {
        console.log(formValues);
        const url = `${BASE_URL}/signup`;

        return axios.post(url, {
            email: formValues.email.toString(),
            firstName: formValues.firstName.toString(),
            surName: formValues.surName.toString(),
            passw: formValues.passw.toString(),
            birth: formValues.birthdate.toString()
        }).then(response => {
            console.log("response.data");
            console.log(response.data);
            let token = response.data.token;
            Auth.authenticateUser(token, formValues.email, response.data.id)
        updateToken();
        browserHistory.push('/');

        }).catch(error => {
            console.log(error.response);
            const response = error.response || {};
            if(response.status === 422) {
                throw new SubmissionError({ email: error.response.data })
            } else {
                throw new SubmissionError({ _error: 'Error creating account. Please contact customer support.' })
            }
        });
}

export function logInUser(form){
        const url = `${BASE_URL}/signin`;
        return axios.post(url,{
            email: form.email,
            password: form.password
        }).then(response => {
            console.log("response.data");
            console.log(response.data);
            // LÄGG FÖLJANDE INLOGGNING I EN FUNKTION EFTERSOM KALLAS PÅ AV SIGNUP OCKSÅ
            let loggedIn = response.data.message;
            let token = response.data.token;
            Auth.authenticateUser(token, form.email, response.data.id)
        updateToken();
        browserHistory.push('/');
        }).catch(function (error) {
            console.log(error.response);
            const response = error.response || {};
            if(response.status === 422) {
                throw new SubmissionError({ email: error.response.data })
            } else {
                throw new SubmissionError({ _error: 'Error creating account. Please contact customer support.' })
            }
        });
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
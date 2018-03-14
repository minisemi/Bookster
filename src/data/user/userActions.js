import axios from 'axios';
const BASE_URL = 'http://localhost:3333';
export const SIGN_UP_USER = 'SIGN_UP_USER';
export const LOG_IN_USER = 'LOG_IN_USER';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';

export function signUpUser(formValues){
    return (dispatch, getState) => {
        const url = `${BASE_URL}/signup`;
        axios.post(url,{
            email: formValues.email.toString(),
            firstName: formValues.firstName.toString(),
            surName: formValues.surName.toString(),
            passw: formValues.password.toString(),
            birth: formValues.birth.toString()
        }).then(response => {
            dispatch({
                type: SIGN_UP_USER,
                payload: response.data
            })
        }).catch(function (error) {
            console.log(error);
        });
    };
}

export function logInUser(form){
    return (dispatch, getState) => {
        const url = `${BASE_URL}/signin`;
        axios.post(url,{
            email: form.email,
            password: form.password
        }).then(response => {
            let loggedIn = response.data.message;
            let token = response.data.token;
            let loginObject = (loggedIn==='signedIn' && token!=null) ?
                {success: true, token: token, userId: response.data.id}
                :
                {success: false, token: null};
            dispatch({
                type: LOG_IN_USER,
                payload: loginObject
            })
        }).catch(function (error) {
            console.log(error);
        });
    };
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
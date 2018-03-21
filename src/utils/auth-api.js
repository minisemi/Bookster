import axios from 'axios';
import {SubmissionError} from 'redux-form'

const BASE_URL = 'http://localhost:3333/auth';

export {signUpUser, logInUser, changePassword};

/*function signUpUser(formValues){
    const url = `${BASE_URL}/signup`;
    return axios.post(url,{
        email: formValues.email.toString(),
        firstName: formValues.firstName.toString(),
        surName: formValues.surName.toString(),
        passw: formValues.password.toString(),
        birth: formValues.birth.toString()
    }).then(response => response.data.message)
        .catch(function (error) {
            console.log(error);
        });
}*/

function signUpUser(formValues){
        console.log(formValues);
        const url = `${BASE_URL}/signup`;

        return axios.post(url,{
            email: formValues.email.toString(),
            firstName: formValues.firstName.toString(),
            surName: formValues.surName.toString(),
            passw: formValues.passw.toString(),
            birth: formValues.birth.toString()
        }).then(response => {
            console.log(response.data);

        }).catch(error => {
      // how you pass server-side validation errors back is up to you
      if(error.validationErrors) {
        throw new SubmissionError(error.validationErrors)
          /*throw new SubmissionError({
        password: 'Wrong password',
        _error: 'Login failed!'
      })*/
      } else {
        // what you do about other communication errors is up to you
      }
    });

}

function logInUser(form){
    const url = `${BASE_URL}/signin`;
    return axios.post(url, {
        email: form.email,
        password: form.password
    }).then(response =>{
        console.log(response.data);
        var loggedIn = response.data.message
        var token = response.data.token
        if (loggedIn==='signedIn' && token!=null){
            return {success: true, token: token, userId: response.data.id}
        }
        else return {success: false, token: null};
    })
        .catch(function (error) {
            console.log(error);
        });
}
function changePassword(oldPassword, newPassword, token){
    const url = `${BASE_URL}/change_pw`;
    return axios.post(url,{oldPassword:oldPassword, newPassword:newPassword}, {headers:{
        Authorization: `Bearer ${token}`
    }}).then(response =>response.data
    )
        .catch(function (error) {
            console.log(error);
        });
}
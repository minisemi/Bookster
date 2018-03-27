import axios from 'axios';
import {SubmissionError} from 'redux-form'

const BASE_URL = 'http://localhost:3333/auth';

export { changePassword};

/*function signUpUser(formValues){
    const url = `${BASE_URL}/signup`;
    return axios.post(url,{
        email: formValues.email.toString(),
        firstName: formValues.firstName.toString(),
        surName: formValues.surName.toString(),
        password: formValues.password.toString(),
        birth: formValues.birth.toString()
    }).then(response => response.data.message)
        .catch(function (error) {
            console.log(error);
        });
}*/

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
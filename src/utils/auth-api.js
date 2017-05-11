import axios from 'axios';
import Cookies from 'universal-cookie';
const cookie = new Cookies();

const BASE_URL = 'http://localhost:3333/auth';


/*
 export function signUp({ email, firstName, familyName, password, age}){
 const url = `${BASE_URL}/auth/signup`
 return function (dispatch){
 axios.post(url, { email, firstName, familyName, password, age})
 .then(response => {
 cookie.set('token', response.data.token, { path: '/' });
 //dispatch({ type: 'auth_user' });
 window.location.href = 'http://localhost:3000/special';
 })
 .catch((error) => {
 console.log('Error!' + error.response)
 });
 }
 */
export {signUpUser, logInUser};

function signUpUser(formValues){
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
}

function logInUser(form){
    const url = `${BASE_URL}/signin`;
    return axios.post(url,{
        email: form.email,
        password: form.password
    }).then(response =>{
        var loggedIn = response.data.message
        var token = response.data.token
        if (loggedIn){
            cookie.set('token', token, { path: '/' })
            return true
        }
        else return false;

    })
        .catch(function (error) {
            console.log(error);
        });
}
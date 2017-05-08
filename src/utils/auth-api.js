import axios from 'axios';

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
export {signUpUser};

function signUpUser(formValues){
    console.log("PW: " +formValues.password);
    const url = `${BASE_URL}/signup`;
    return axios.post(url,{
        email: formValues.email.toString(),
        firstName: formValues.firstName.toString(),
        surName: formValues.surName.toString(),
        passw: formValues.password.toString(),
        birth: formValues.birth.toString()
    }).then(function(response){
    console.log('saved successfully')
  });
}
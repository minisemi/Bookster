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
   const url = `${BASE_URL}/signup`;
    return axios.get(url,{
        email: form.email.toString(),
        password: form.password.toString()
    }).then(response => response.data.message)
      .catch(function (error) {
    console.log(error);
  });
}
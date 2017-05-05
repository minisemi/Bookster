import axios from 'axios';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';

const BASE_URL = 'http://localhost:3333';


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
export {getCurrentBookings, getCompanies, getCompany};

function getCurrentBookings() {
  const url = `${BASE_URL}/api/booking/current`;
  return axios.get(url).then(response => response.data)
      .catch(function (error) {
    console.log(error);
  });
}
function getCompany(id) {
  const url = `${BASE_URL}/api/companies/${id}`;
  return axios.get(url).then(response => response.data)
      .catch(function (error) {
    console.log(error);
  });
}
function getBooking(id) {
  const url = `${BASE_URL}/api/companies/booking${id}`;
  return axios.get(url).then(response => response.data)
      .catch(function (error) {
    console.log(error);
  });
}

function getCompanies(query) {
  const url = `${BASE_URL}/api/companies`;
  return axios.post(url,{
    query: query
  }).then(response => response.data)
      .catch(function (error) {
    console.log(error);
  });
}
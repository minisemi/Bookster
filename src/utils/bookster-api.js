import axios from 'axios';

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
export {getCurrentBookings, getServerSuggestions, getCompany, getBooking, getCompanyBookings, getFavourites, getRecommendations, getUserInfo};

function getCurrentBookings(id) {
  const url = `${BASE_URL}/api/users/${id}/current`;
  return axios.get(url).then(response => response.data)
      .catch(function (error) {
    console.log(error);
  });
}

function getFavourites(id) {
  const url = `${BASE_URL}/api/users/${id}/favourites`;
  return axios.get(url).then(response => response.data)
      .catch(function (error) {
    console.log(error);
  });
}

function getRecommendations(id) {
  const url = `${BASE_URL}/api/users/${id}/recommendations`;
  return axios.get(url).then(response => response.data)
      .catch(function (error) {
    console.log(error);
  });
}

function getCompanyBookings(id){
  const url = `${BASE_URL}/api/companies/${id}/bookings`;
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
function getBooking(compId, bookId) {
  const url = `${BASE_URL}/api/companies/${compId}/bookings/${bookId}`;
  return axios.get(url).then(response => response.data)
      .catch(function (error) {
    console.log(error);
  });
}


function getServerSuggestions(query) {
  const url = `${BASE_URL}/api/suggestions`;
  return axios.get(url,{
    params: {
      query: query
    }

  }).then(response => response.data)
      .catch(function (error) {
    console.log(error);
  });
}

function getUserInfo (token){
    const url = `${BASE_URL}/api/get_user`
    return axios.get(url, {headers:{
            Authorization: `JWT ${token}`
    }}).then(response => response.data)
        .catch(function (error) {
            console.log(error)
        })
}
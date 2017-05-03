import axios from 'axios';

const BASE_URL = 'http://localhost:3333';

export {getCurrentBookings, getCompanies};

function getCurrentBookings() {
  const url = `${BASE_URL}/api/booking/current`;
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
  });;
}
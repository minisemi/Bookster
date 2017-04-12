import axios from 'axios';

const BASE_URL = 'http://localhost:3333';

export {getCurrentBookings};

function getCurrentBookings() {
  const url = `${BASE_URL}/api/booking/current`;
  return axios.get(url).then(response => response.data);
}
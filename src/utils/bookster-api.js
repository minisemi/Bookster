import axios from 'axios';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';

const BASE_URL = 'http://localhost:3333/api';

export function getCurrentBookings() {
    const url = `${BASE_URL}/booking/current`;
    return axios.get(url).then(response => response.data);
}

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
}
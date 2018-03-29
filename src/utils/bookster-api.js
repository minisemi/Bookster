import axios from 'axios';
const BASE_URL = 'http://localhost:3333';
import Auth from '../Auth';

axios.defaults.headers.common['Authorization'] = `Bearer ${Auth.getToken()}`;

export { getServerSuggestions, updateToken };

function updateToken(){
    axios.defaults.headers.common['Authorization'] = `Bearer ${Auth.getToken()}`;
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

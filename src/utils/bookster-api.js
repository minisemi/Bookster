import axios from 'axios';

const BASE_URL = 'http://localhost:3333';
import Auth from '../Auth';

axios.defaults.headers.common['Authorization'] = `Bearer ${Auth.getToken()}`;


export { getServerSuggestions, getCompany, getCompanyBookables,
     getCalenderEvents, bookEvent, unBookEvent,  getUserInfo, updateUserInfo, updateToken };

function updateToken(){
    axios.defaults.headers.common['Authorization'] = `Bearer ${Auth.getToken()}`;
}


function getCompanyBookables(id){
    const url = `${BASE_URL}/api/companies/${id}/bookables`;
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

function getCalenderEvents(bookId) {
    const url = `${BASE_URL}/api/companies/compId/bookables/${bookId}/calender/events`;
    return axios.get(url).then(response => response.data)
        .catch(function (error) {
            console.log(error);
        });
}

function bookEvent(bookableAlias, start, user) {
    const url = `${BASE_URL}/api/companies/compId/bookables/${bookableAlias}/calender/events/book`;
    return axios.post(url, {
        user: user,
        start: start,
        bookableAlias: bookableAlias,
    }).then(response => {
        let success = response.data.success;
        return {success:success}})
        .catch(function (error) {
            console.log(error);
        });
}

function unBookEvent(bookableAlias, start, user) {
    const url = `${BASE_URL}/api/companies/compId/bookables/${bookableAlias}/calender/events/unBook`;
    return axios.post(url, {
        user: user,
        start: start,
        bookableAlias: bookableAlias,
    }).then(response => {
        let success = response.data.success;
        return {success:success}})
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

function updateUserInfo( info){
    const url = `${BASE_URL}/api/update_user`
    return axios.post(url,info).then(response => response.data)
        .catch(function (error) {
            console.log("ERROR!!" + error)
        })
}

function getUserInfo (){
    const url = `${BASE_URL}/api/get_user`
    return axios.get(url, {headers:{
        Authorization: `JWT ${Auth.getToken()}`
    }}).then(response => response.data)
        .catch(function (error) {
            console.log(error)
        })
}
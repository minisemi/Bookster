import axios from 'axios';
const BASE_URL = 'http://localhost:3333';
export const SET_CURRENT_BOOKINGS = 'SET_CURRENT_BOOKINGS';
export const SET_FAVOURITES = 'SET_FAVOURITES';
export const SET_RECOMMENDATIONS = 'SET_RECOMMENDATIONS';
export const SET_BOOKABLE = 'SET_BOOKABLE';
export const ADD_FAVOURITE = 'ADD_FAVOURITE';
export const DELETE_FAVOURITE = 'DELETE_FAVOURITE';
export const SET_COMPANY_BOOKABLES = 'SET_COMPANY_BOOKABLES';
export const SET_BOOKABLE_EVENTS = 'SET_BOOKABLE_EVENTS';
export const SET_EVENTS_ERROR = 'SET_EVENTS_ERROR';
import Auth from '../../Auth'

export function getCurrentBookings() {
    return (dispatch, getState) => {
        const url = `${BASE_URL}/api/users/${Auth.getEmail()}/current`;
        return axios.get(url).then(response => {
            return dispatch({
                type: SET_CURRENT_BOOKINGS,
                payload: response.data
            })
        }).catch(function (error) {
            console.log(error);
        });
    };
}

export function getFavourites() {
    return (dispatch, getState) => {
        const url = `${BASE_URL}/api/users/${Auth.getEmail()}/favourites`;
        return axios.get(url).then(response => {
            return dispatch({
                type: SET_FAVOURITES,
                payload: response.data
            })
        }).catch(function (error) {
            console.log(error);
        });
    };
}

export function addFavourite(bookableID, companyID){
    return (dispatch, getState) => {
        const url = `${BASE_URL}/api/addFavourite`;
        return axios.post(url,{
            user: Auth.getUserId(),
            bookable: bookableID,
            company:companyID
        }).then(response => {
            if (response.data.message==="success") {
                let newBookable = {};
                let oldBookable = getState().bookables.bookable;
                for (let prop in oldBookable) {
                    if (oldBookable.hasOwnProperty(prop)) {
                        newBookable[prop] = oldBookable[prop];
                    }
                }
                newBookable.favourite = true;
                return dispatch({
                    type: ADD_FAVOURITE,
                    payload: newBookable
                })
            }
        }).catch(function (error) {
            console.log(error);
        });
    };
}

export function deleteFavourite(bookableID, companyID){
    return (dispatch, getState) => {
        const url = `${BASE_URL}/api/deleteFavourite`;
        return axios.post(url,{
            user: Auth.getUserId(),
            bookable: bookableID,
            company:companyID
        }).then(response => {
            if (response.data.message==="success") {
                let newBookable = {};
                let oldBookable = getState().bookables.bookable;
                for (let prop in oldBookable) {
                    if (oldBookable.hasOwnProperty(prop)) {
                        newBookable[prop] = oldBookable[prop];
                    }
                }
                newBookable.favourite = false;
                return dispatch({
                    type: DELETE_FAVOURITE,
                    payload: newBookable
                })
            }
        }).catch(function (error) {
            console.log(error);
        });
    };
}

export function getRecommendations() {
    return (dispatch, getState) => {
        const url = `${BASE_URL}/api/users/${Auth.getEmail()}/recommendations`;
        return axios.get(url).then(response => (
            dispatch({
                type: SET_RECOMMENDATIONS,
                payload: response.data
            })
        )).catch(function (error) {
            console.log(error);
        });
    };
}

export function getCompanyBookables(id){
    return (dispatch, getState) => {
        const url = `${BASE_URL}/api/companies/${id}/bookables`;
        return axios.get(url).then(response => (
            dispatch({
                type: SET_COMPANY_BOOKABLES,
                payload: response.data
            })
        )).catch(function (error) {
            console.log(error);
        });
    };
}

export function getBookable(compId, bookId) {
    return (dispatch, getState) => {
        const url = `${BASE_URL}/api/companies/${compId}/bookables/${bookId}/${Auth.getUserId()}`;
        return axios.get(url).then(response => (
            dispatch({
                type: SET_BOOKABLE,
                payload: response.data
            })
        )).catch(function (error) {
            console.log("error get bookable");
            console.log(error);
        });
    };
}

export function getBookableEvents(bookId) {
    return (dispatch, getState) => {
        const url = `${BASE_URL}/api/companies/compId/bookables/${bookId}/calender/events`  ;
        return axios.get(url).then(response => {
            return setBookableEvents(dispatch, response.data);
        }).catch(function (error) {
            console.log("error get bookable");
            console.log(error);
        });
    };
}

export function bookEvent(bookableAlias, start) {
    return (dispatch, getState) => {
        dispatch({
            type: SET_EVENTS_ERROR,
            payload: undefined,
        });
        const url = `${BASE_URL}/api/companies/compId/bookables/${bookableAlias}/calender/events/book`;
        return axios.post(url,{
            user: Auth.getEmail(),
            start: start,
            bookableAlias: bookableAlias
        }).then(response => {
            if (response.data.errorMessage) {
                dispatch({
                    type: SET_EVENTS_ERROR,
                    payload: { type: "danger", message: response.data.errorMessage },
                });
            }
            return setBookableEvents(dispatch, response.data.events);
        }).catch(function (error) {
            console.log(error);
        });
    };
}

function setBookableEvents(dispatch, response){
    let events = response;
    for (let i=0; i<events.length;i++){
        events[i].start = new Date(events[i].start);
        events[i].end = new Date(events[i].end);
    }
    return dispatch({
        type: SET_BOOKABLE_EVENTS,
        payload: events
    })
}

export function unBookEvent(bookableAlias, start) {
    return (dispatch, getState) => {
        dispatch({
            type: SET_EVENTS_ERROR,
            payload: undefined,
        });
        const url = `${BASE_URL}/api/companies/compId/bookables/${bookableAlias}/calender/events/unBook`;
        return axios.post(url,{
            user: Auth.getEmail(),
            start: start,
            bookableAlias: bookableAlias
        }).then(response => {
            return setBookableEvents(dispatch, response.data);
        }).catch(function (error) {
            console.log(error);
            const response = error.response || {};
            return dispatch({
                type: SET_EVENTS_ERROR,
                payload: { type: "danger", message: response.data },
            })
        });
    };
}
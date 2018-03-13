import axios from 'axios';
const BASE_URL = 'http://localhost:3333';
export const GET_CURRENT_BOOKINGS = 'GET_CURRENT_BOOKINGS';
export const GET_FAVOURITES = 'GET_FAVOURITES';
export const GET_RECOMMENDATIONS = 'GET_RECOMMENDATIONS';
export const GET_BOOKABLE = 'GET_BOOKABLE';
export const ADD_FAVOURITE = 'ADD_FAVOURITE';
export const DELETE_FAVOURITE = 'DELETE_FAVOURITE';
const id = "a.ulander@live.se";
const userID = 4;

export function getCurrentBookings() {
    return (dispatch, getState) => {
        const url = `${BASE_URL}/api/users/${id}/current`;
        axios.get(url).then(response => {
            dispatch({
                type: GET_CURRENT_BOOKINGS,
                payload: response.data
            })
        }).catch(function (error) {
            console.log(error);
        });
    };
}

export function getFavourites() {
    return (dispatch, getState) => {
        const url = `${BASE_URL}/api/users/${id}/favourites`;
        axios.get(url).then(response => {
            dispatch({
                type: GET_FAVOURITES,
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
        axios.post(url,{
            user: userID,
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
                dispatch({
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
        axios.post(url,{
            user: userID,
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
                dispatch({
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
        const url = `${BASE_URL}/api/users/${id}/recommendations`;
        axios.get(url).then(response => {
            dispatch({
                type: GET_RECOMMENDATIONS,
                payload: response.data
            })
        }).catch(function (error) {
            console.log(error);
        });
    };
}

export function getCompanyBookables(id){
    const url = `${BASE_URL}/api/companies/${id}/bookables`;
    return axios.get(url).then(response => response.data)
        .catch(function (error) {
            console.log(error);
        });

}

export function getBookable(compId, bookId) {
    return (dispatch, getState) => {
        const url = `${BASE_URL}/api/companies/${compId}/bookables/${bookId}/${userID}`;
        axios.get(url).then(response => {
            dispatch({
                type: GET_BOOKABLE,
                payload: response.data
            })
        }).catch(function (error) {
            console.log(error);
        });
    };
}
import axios from 'axios';
const BASE_URL = 'http://localhost:3333';
export const GET_CURRENT_BOOKINGS = 'GET_CURRENT_BOOKINGS';

export function getBookables() {
    return (dispatch, getState) => {
            const request = {bookable1: "fotbollsplan"};
            dispatch({
                type: GET_CURRENT_BOOKINGS,
                payload: request
            })
        };
}

export function getCurrentBookings(id) {
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
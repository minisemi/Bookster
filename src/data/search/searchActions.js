import axios from 'axios';
const BASE_URL = 'http://localhost:3333';
import { push } from 'react-router-redux';
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS';

export function getSearchResults (query) {
    return (dispatch, getState) => {
        const url = `${BASE_URL}/api/suggestions`;
        return axios.get(url,{
        params: {
            query: query
        }}).then(response => {
            return dispatch({
                type: SET_SEARCH_RESULTS,
                payload: response.data
            })
        }).catch(function (error) {
            console.log(error);
        });
    };
}

export function changeRoute (url) {
    return (dispatch, getState) => dispatch(push(url))
}

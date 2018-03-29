import axios from 'axios';
const BASE_URL = 'http://localhost:3333';
export const GET_COMPANY = 'GET_COMPANY';

export function getCompany(id) {
    return (dispatch, getState) => {
        const url = `${BASE_URL}/api/companies/${id}`;
        return axios.get(url).then(response => (
            dispatch({
                type: GET_COMPANY,
                payload: response.data
            })
            )).catch(function (error) {
            console.log(error);
        });
    };
}

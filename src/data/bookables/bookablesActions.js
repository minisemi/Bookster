export const GET_BOOKABLES = 'GET_BOOKABLES';

export function getBookables() {
    return (dispatch, getState) => {
            const request = {bookable1: "fotbollsplan"};
            dispatch({
                type: GET_BOOKABLES,
                payload: request
            })
        };
}
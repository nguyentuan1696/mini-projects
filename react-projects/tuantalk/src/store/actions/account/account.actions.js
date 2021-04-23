


export function setDataAccount(data)
{
    return dispatch => {
        dispatch({
            type: "SET-ACCOUNT",
            payload: data
        });

    }
}

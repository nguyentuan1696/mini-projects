export function setScrollView(data) {
    return dispatch => {
        dispatch({
            type: "SET-SCROLL-VIEW",
            payload: data
        });

    }
}

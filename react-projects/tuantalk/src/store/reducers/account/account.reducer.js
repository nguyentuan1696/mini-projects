const account = function (state = {}, action) {
    switch ( action.type )
    {
        case "SET-ACCOUNT": {
            return {...state, values: action.payload}
        }
        default: {
            return state
        }

    }
};

export default account;


const scroll = function (state = 0, action) {
    switch ( action.type )
    {
        case "SET-SCROLL-VIEW": {
            return {...state, values: action.payload}
        }
        default: {
            return state
        }

    }
};

export default scroll;

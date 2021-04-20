import { SET_ACCOUNT } from './contants'

const initialState = {
  acc: '',
}

const reducer = (state = initialState, action) => {
  if (action.type === SET_ACCOUNT) {
    return { ...state, values: action.payload }
  }

  return state
}

export default reducer

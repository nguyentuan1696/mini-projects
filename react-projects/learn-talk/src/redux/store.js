import { SET_ACCOUNT } from './contants'
import reducer from './reducer'
import { createStore } from 'redux'

const initialState = {
  acc: '',
}

export const store = createStore(reducer, initialState)



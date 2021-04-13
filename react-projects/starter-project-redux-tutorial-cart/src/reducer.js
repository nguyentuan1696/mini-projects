import { DECREASE, INCREASE, CLEAR_CART, REMOVE, GET_TOTALS } from './actions'

const reducer = (state, action) =>
{
  console.log({action})
  if (action.type === CLEAR_CART) {
    return { ...state, count: [] }
  }

  if(action.type === DECREASE) {
    let tempCart = []
    if (action.payload.amount === 1) {
       tempCart = state.cart.filter(cartItem => cartItem.id !== action.payload.id)
    } else {
      tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          cartItem = { ...cartItem, amount: cartItem.amount - 1 }
        }
        return cartItem
      })
     }
    return { ...state, cart: tempCart }
  }

  if (action.type === INCREASE) {
    let tempCart = state.cart.map((cartItem) =>
    {
      if (cartItem.id === action.payload.id) {
        cartItem = {...cartItem, amount: cartItem.amount + 1}
      }
      return cartItem
    })
    return {...state, cart: tempCart}
  }

  if (action.type === REMOVE) {
    return {...state, cart: state.cart.filter((cartItem) => cartItem.id !== action.payload.id)}
    
  }

  if (action.type === GET_TOTALS) {
    
  }
  return state
}

export default reducer

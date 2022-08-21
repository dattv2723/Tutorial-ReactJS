const reducer = (state, action) => {
  if (action.type === 'CLEAR_CART') {
    return { ...state, cart: [] }
  }
  if (action.type === 'REMOVE') {
    return { ...state, cart: state.cart.filter((i) => i.id !== action.payload) }
  }
  if (action.type === 'TOGGLE_AMOUNT') {
    console.log('acd')
    let tempCart = state.cart
      .map((item) => {
        if (item.id === action.payload.id) {
          const amount =
            action.payload.type === 'inc' ? item.amount + 1 : item.amount - 1
          console.log(amount)
          return { ...item, amount: amount }
        }
        return item
      })
      .filter((item) => item.amount !== 0)
    return { ...state, cart: tempCart }
  }
  if (action.type === 'GET_TOTALS') {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem
        cartTotal.amount += amount
        cartTotal.total += price * amount
        return cartTotal
      },
      {
        total: 0,
        amount: 0,
      }
    )
    total = parseFloat(total).toFixed(2)
    return { ...state, total, amount }
  }

  if (action.type === 'LOADING') {
    return { ...state, loading: true }
  }
  if (action.type === 'DISPLAY_ITEMS') {
    return { ...state, cart: action.payload, loading: false }
  }

  throw new Error('no matching action type')
}

export default reducer

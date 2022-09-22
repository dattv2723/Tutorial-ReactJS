import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      let maxPrice = action.payload.map((p) => p.price)
      maxPrice = Math.max(...maxPrice)
      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
        filters: {
          ...state.filters,
          max_price: maxPrice,
          price: maxPrice,
        },
      }
    case SET_GRIDVIEW:
      return {
        ...state,
        grid_view: true,
      }
    case SET_LISTVIEW:
      return {
        ...state,
        grid_view: false,
      }
    case UPDATE_SORT:
      return {
        ...state,
        sort: action.payload,
      }
    case SORT_PRODUCTS:
      const { sort, filtered_products } = state
      let tempProducts = [...filtered_products]
      if (sort === 'price-lowest') {
        tempProducts = tempProducts.sort((a, b) => a.price - b.price)
      }
      if (sort === 'price-highest') {
        tempProducts = tempProducts.sort((a, b) => b.price - a.price)
      }
      if (sort === 'name-a') {
        tempProducts = tempProducts.sort((a, b) => {
          return a.name.localeCompare(b.name)
        })
      }
      if (sort === 'name-z') {
        tempProducts = tempProducts.sort((a, b) => {
          return b.name.localeCompare(a.name)
        })
      }
      return { ...state, filtered_products: tempProducts }

    case UPDATE_FILTERS:
      const { name, value } = action.payload
      return { ...state, filters: { ...state.filters, [name]: value } }

    case FILTER_PRODUCTS:
      const { all_products } = state
      const { text, category, company, color, price, shipping } = state.filters
      let tempFilterProducts = [...all_products]

      //filtering
      if (text) {
        tempFilterProducts = tempFilterProducts.filter((p) => {
          return p.name.toLowerCase().startsWith(text)
        })
      }
      if (category !== 'all') {
        tempFilterProducts = tempFilterProducts.filter(
          (p) => p.category === category
        )
      }
      if (company !== 'all') {
        tempFilterProducts = tempFilterProducts.filter(
          (p) => p.company === company
        )
      }
      if (color !== 'all') {
        tempFilterProducts = tempFilterProducts.filter((p) => {
          return p.colors.find((c) => c === color)
        })
      }
      tempFilterProducts = tempFilterProducts.filter((p) => p.price <= price)
      if (shipping) {
        tempFilterProducts = tempFilterProducts.filter(
          (p) => p.shipping === true
        )
      }
      return { ...state, filtered_products: tempFilterProducts }

    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: '',
          company: 'all',
          category: 'all',
          color: 'all',
          price: state.filters.max_price,
          shipping: false,
        },
      }
    default:
      break
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer

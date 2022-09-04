import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions'

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: true }
    case SET_STORIES:
      return {
        ...state,
        isLoading: false,
        hits: action.payload.hits,
        nbPages: action.payload.nbPages,
      }

    case REMOVE_STORY:
      return {
        ...state,
        hits: state.hits.filter((i) => i.objectID !== action.payload),
      }

    case HANDLE_SEARCH:
      return { ...state, query: action.payload, page: 0 }

    case HANDLE_PAGE:
      let page = state.page
      if (action.payload === 'inc') {
        page = page + 1
        if (page > state.nbPages - 1) page = 0
      } else if (action.payload === 'dec') {
        page = page - 1
        if (page < 0) page = state.nbPages - 1
      }
      return { ...state, page: page }

    default:
      throw new Error(`no matching '${action.type}' action type`)
  }
}
export default reducer

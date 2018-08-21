import { FETCH_DATA, FETCH_THREADS } from '../actions/types'

const initialState = {
  data: [],
  threads: [],
}

export default (state = initialState, action) => {
  switch(action.type) {
    case FETCH_DATA:
      return {
        ...state,
        data: action.payload
      }
    case FETCH_THREADS:
      return {
        ...state,
        threads: action.payload
      }
    default:
      return state
  }
}
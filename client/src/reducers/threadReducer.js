import { FETCH_DATA, FETCH_THREADS } from '../actions/types'

const initialState = {
  users: [],
  threads: [],
}

export default (state = initialState, action) => {
  switch(action.type) {
    case FETCH_DATA:
      return {
        ...state,
        users: action.payload
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
import { FETCH_DATA, FETCH_THREADS, POST_NEW_THREAD } from '../actions/types'

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
    case POST_NEW_THREAD:
      return {
        ...state,
        threads: [ ...state.threads, action.payload ]
      }
    default:
      return state
  }
}
import {
  FETCH_DATA,
  FETCH_THREADS,
  POST_NEW_THREAD,
  MAKE_NEW_POST,
  FETCH_POSTS,
  FETCH_SUBFORUM_THREADS
} from '../actions/types'

const initialState = {
  users: [],
  threads: [],
  posts: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        users: action.payload
      }
    case FETCH_THREADS:
      return {
        ...state,
        threads: action.payload,
        posts: []
      }
    case FETCH_SUBFORUM_THREADS:
      return {
        ...state,
        threads: action.payload
      }
    case POST_NEW_THREAD:
      return {
        ...state,
        threads: [...state.threads, action.payload]
      }
    case MAKE_NEW_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload]
      }
    case FETCH_POSTS:
      return {
        ...state,
        posts: action.payload
      }
    default:
      return state
  }
}

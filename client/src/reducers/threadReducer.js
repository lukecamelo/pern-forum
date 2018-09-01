import {
  FETCH_DATA,
  FETCH_THREADS,
  POST_NEW_THREAD,
  MAKE_NEW_POST,
  FETCH_POSTS
} from '../actions/types'

const initialState = {
  users: [],
  threads: [],
  posts: []
}

const findThreadIndexById = (array, value) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i]['id'] == value) {
      return i
    }
  }
  return -1
}

const bumpThreadToTop = (index, array) => [
  array[index],
  ...array.filter((i, idx) => idx !== index)
]

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
    case POST_NEW_THREAD:
      return {
        ...state,
        threads: [...state.threads, action.payload]
      }
    case MAKE_NEW_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
        // Thread sorting (work in progress)
        // threads: bumpThreadToTop(
        //   findThreadIndexById(state.threads, action.payload.thread.id),
        //   state.threads
        // )
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

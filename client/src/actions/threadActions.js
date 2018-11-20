import {
  FETCH_DATA,
  POST_NEW_THREAD,
  MAKE_NEW_POST,
  FETCH_SUBFORUM_THREADS
} from './types'

// import store from '../store'
import api from '../services/api'
// const auth = store.getState().auth.token

export const fetchData = () => dispatch => {
  api.users
    .getAll()
    .then(users => {
      dispatch({
        type: FETCH_DATA,
        payload: users
      })
    })
    .catch(err => console.log('FETCH_USERS ERROR: ', err))
}

// TODO: write this route
export const fetchSubforumThreads = subforumId => dispatch => {
  api.threads.getAll(subforumId).then(threads => {
    dispatch({
      type: FETCH_SUBFORUM_THREADS,
      payload: threads
    })
  })
}

export const postNewThread = (
  title,
  content,
  userId,
  author,
  subforumId = 1
) => dispatch => {
  api.threads
    .postOne(title, content, userId, author, subforumId)
    .then(thread => {
      dispatch({
        type: POST_NEW_THREAD,
        payload: thread
      })
    })
    .catch(err => console.log('POST_NEW_THREAD ERROR: ', err))
}

export const makeNewPost = (
  content,
  username,
  userId,
  threadId
) => dispatch => {
  api.post.create(content, username, userId, threadId)
    .then(() => {
      dispatch({
        type: MAKE_NEW_POST
      })
    })
    .catch(err => console.log('error making post: ', err))
}

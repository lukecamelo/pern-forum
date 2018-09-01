import {
  FETCH_DATA,
  FETCH_THREADS,
  POST_NEW_THREAD,
  MAKE_NEW_POST,
  FETCH_POSTS,
} from './types'

export const fetchData = () => dispatch => {
  fetch('/api/users', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
    .then(res => res.json())
    .then(json => {
      dispatch({
        type: FETCH_DATA,
        payload: json
      })
    })
    .catch(err => console.log('FETCH_USERS ERROR: ', err))
}

export const fetchThreads = () => dispatch => {
  fetch('/api/threads')
    .then(res => res.json())
    .then(threads => {
      dispatch({
        type: FETCH_THREADS,
        payload: threads
      })
    })
    .catch(err => console.log('FETCH_THREADS ERROR: ', err))
}

export const postNewThread = (title, content, userId) => dispatch => {
  fetch('/api/threads', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, content, userId })
  })
    .then(res => res.json())
    .then(thread => {
      dispatch({
        type: POST_NEW_THREAD,
        payload: thread
      })
    })
    .catch(err => console.log(err))
}

export const makeNewPost = (
  content,
  username,
  userId,
  threadId
) => dispatch => {
  fetch(`/api/threads/${threadId}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ content, username, userId, threadId })
  })
    .then(res => res.json())
    .then(post => {
      dispatch({
        type: MAKE_NEW_POST,
        payload: post
      })
    })
    .catch(err => console.log('error making post: ', err))
}

export const fetchPosts = threadId => dispatch => {
  fetch(`/api/threads/${threadId}/posts`)
    .then(res => res.json())
    .then(posts => {
      dispatch({
        type: FETCH_POSTS,
        payload: posts
      })
    })
}

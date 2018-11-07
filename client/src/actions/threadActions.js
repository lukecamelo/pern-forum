import {
  FETCH_DATA,
  FETCH_THREADS,
  POST_NEW_THREAD,
  MAKE_NEW_POST,
  FETCH_SUBFORUM_THREADS
} from './types'

import store from '../store'
// import axios from 'axios'
const auth = store.getState().auth.token

export const fetchData = () => dispatch => {
  return fetch('/api/users', {
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
  return fetch('/thread/threads', {
    headers: {
      Authorization: `Bearer ${auth}`
    }
  })
    .then(res => res.json())
    .then(threads => {
      dispatch({
        type: FETCH_THREADS,
        payload: threads
      })
    })
    .catch(err => console.log('FETCH_THREADS ERROR: ', err))
}

// TODO: write this route
export const fetchSubforumThreads = subforumId => dispatch => {
  return fetch(`/thread/subforum/${subforumId}`)
    .then(res => res.json())
    .then(threads => {
      dispatch({
        type: FETCH_SUBFORUM_THREADS,
        payload: threads
      })
    })
}

export const postNewThread = (title, content, userId, author, subforumId = 1) => dispatch => {
  return fetch('/thread/threads', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${auth}`
    },
    body: JSON.stringify({ title, content, userId, author, subforumId })
  })
    .then(res => res.json())
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
  return fetch(`/thread/${threadId}/posts`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json; charset=utf-8'
      // Authorization: `Bearer ${auth}`
    },
    body: JSON.stringify({ content, username, userId, threadId })
  })
    .then(() => {
      dispatch({
        type: MAKE_NEW_POST
      })
    })
    .catch(err => console.log('error making post: ', err))
}

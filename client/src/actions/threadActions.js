import {
  FETCH_DATA,
  FETCH_THREADS,
  POST_NEW_THREAD,
  MAKE_NEW_POST,
  FETCH_POSTS
} from './types'

import store from '../store'
import axios from 'axios'
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

export const postNewThread = (title, content, userId, author) => dispatch => {
  return fetch('/thread/threads', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${auth}`
    },
    body: JSON.stringify({ title, content, userId, author })
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

/* ----- Not sure if actions below this line are strictly necessary ----- */
function fetchWithTimeout (url, options, timeout = 7000) {
  return Promise.race([
      fetch(url, options),
      new Promise((_, reject) =>
          setTimeout(() => reject(new Error('timeout')), timeout)
      )
  ]);
}

export const makeNewPost = (
  content,
  username,
  userId,
  threadId
) => dispatch => {
  return fetch(`http://localhost:3000/thread/${threadId}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json; charset=utf-8'
      // Authorization: `Bearer ${auth}`
    },
    body: JSON.stringify({ content, username, userId, threadId })
  })
    .then(res => {
      if(res.status === 'OK') {
        console.log('YAYAYAYAYAYAYAYAYAYAYAYAYAYAYA')
      }
    })
    .then(post => {
      dispatch({
        type: MAKE_NEW_POST,
        payload: post
      })
    })
    .catch(err => console.log('error making post: ', err))
}

export const fetchPosts = threadId => dispatch => {
  return fetch(`/thread/${threadId}/posts`)
    .then(res => res.json())
    .then(posts => {
      dispatch({
        type: FETCH_POSTS,
        payload: posts
      })
    })
}

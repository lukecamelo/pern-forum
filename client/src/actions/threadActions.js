import { FETCH_DATA, FETCH_THREADS, FETCH_AUTHOR } from './types'

export const fetchData = () => dispatch => {
  fetch('/api/users')
    .then(res => res.json())
    .then(json => {
      dispatch({
        type: FETCH_DATA,
        payload: json
      })
    })
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
    .catch(err => console.log(err))
}

// probably unnecessary?
export const fetchThreadAuthor = (userId) => dispatch => {
  fetch('/api/users')
    .then(res => res.json())
    .then(res => {
      dispatch({
        type: FETCH_AUTHOR,
        payload: res.filter(user => user.id === userId)
      })
    })
    .catch(err => console.log('fetch author failed: ', err))
}
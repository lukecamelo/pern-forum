import { USER_LOGIN, USER_LOGOUT, USER_SIGNUP } from './types'

export const userLogin = (username, password) => dispatch => {
  fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json())
    .then(res => {
      if (res.token) {
        localStorage.Authorization = res.token
        dispatch({
          type: USER_LOGIN,
          payload: res.user.username
        })
      }
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

export const userLogout = () => dispatch => {
  localStorage.clear('Authorization')
  dispatch({
    type: USER_LOGOUT
  })
}

export const userSignup = (username, password) => dispatch => {
  fetch('/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json())
    .then(res => {
      dispatch({
        type: USER_SIGNUP,
        payload: res.message
      })
    })
    .catch(err => console.log(err))
}
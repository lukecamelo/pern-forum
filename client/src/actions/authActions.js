import { USER_LOGIN_SUCCESS, USER_LOGOUT, USER_SIGNUP, USER_LOGIN_FAIL, CHECK_USER_LOGGEDIN } from './types'

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
        // localStorage.Authorization = res.token
        localStorage.setItem('Authorization', JSON.stringify(res.token))
        localStorage.setItem('User', JSON.stringify(res.user))
        // localStorage.User = res.user.username
        // localStorage.UserId = res.user.id
        // localStorage.UserObject = res.user
        // console.log(localStorage.UserObject.username)
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: res
        })
      } else {
        dispatch({
          type: USER_LOGIN_FAIL,
          payload: res.message
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

export const userSignup = (username, password, avatarUrl) => dispatch => {
  fetch('/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password, avatarUrl })
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

export const checkUserLoggedIn = () => dispatch => {
  fetch('/user/profile', {
    headers: {
      'Authorization': 'Bearer ' + localStorage.Authorization
    }
  })
    .then(res => res.json())
    .then(res => dispatch({
      type: CHECK_USER_LOGGEDIN,
      payload: res
    }))
}
import {
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_SIGNUP,
  USER_LOGIN_FAIL,
  CHECK_USER_LOGGEDIN
} from './types'

import api from '../services/api'

const userLoginSuccess = user => ({
  type: USER_LOGIN_SUCCESS,
  payload: user
})

const userLoginFailure = message => ({
  type: USER_LOGIN_FAIL,
  payload: message
})

const userLogoutSuccess = () => ({ type: USER_LOGOUT })

const userSignupSuccess = message => ({
  type: USER_SIGNUP,
  payload: message
})

const checkLogin = user => ({
  type: CHECK_USER_LOGGEDIN,
  payload: user
})

export const userLogin = (username, password) => dispatch => {
  api.auth
    .login(username, password)
    .then(res => {
      if (res.token) {
        localStorage.setItem('Authorization', JSON.stringify(res.token))
        localStorage.setItem('User', JSON.stringify(res.user))
        dispatch(userLoginSuccess(res))
      } else {
        dispatch(userLoginFailure(res.message))
      }
    })
    .catch(err => console.log(err))
}

export const userLogout = () => dispatch => {
  localStorage.clear('Authorization')
  dispatch(userLogoutSuccess())
}

export const userSignup = (username, password, avatarUrl) => dispatch => {
  api.auth
    .signup(username, password, avatarUrl)
    .then(res => {
      dispatch(userSignupSuccess(res.message))
    })
    .catch(err => console.log(err))
}

export const checkUserLoggedIn = () => dispatch => {
  console.log(localStorage.Authorization)
  // fetch('/user/profile', {
  //   headers: {
  //     Authorization: 'Bearer ' + JSON.parse(localStorage.Authorization)
  //   }
  // })
  //   .then(res => res.json())
  api.auth.checkLogin()
    .then(res => dispatch(checkLogin(res)))
}

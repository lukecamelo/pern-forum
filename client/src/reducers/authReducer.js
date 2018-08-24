import {
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_SIGNUP,
  USER_LOGIN_FAIL
} from '../actions/types'

let isToken
let username
let userId
if (localStorage.Authorization) {
  isToken = true
  username = localStorage.User
  userId = localStorage.UserId
} else {
  isToken = false
}

const initialState = {
  username,
  userId,
  isLoggedIn: isToken,
  message: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        username: action.payload.user.username,
        userId: action.payload.user.id,
        isLoggedIn: true,
        message: action.payload.message
      }
    case USER_LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        message: action.payload
      }
    case USER_LOGOUT:
      return {
        ...state,
        username: 'not logged in',
        isLoggedIn: false,
        userId: null,
        message: ''
      }
    case USER_SIGNUP:
      return {
        ...state,
        message: action.payload
      }
    default: {
      return state
    }
  }
}

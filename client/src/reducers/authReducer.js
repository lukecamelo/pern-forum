import {
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_SIGNUP,
  USER_LOGIN_FAIL
} from '../actions/types'

let isToken
if (localStorage.Authorization) {
  isToken = true
} else {
  isToken = false
}

const initialState = {
  username: 'not logged in',
  isLoggedIn: isToken,
  message: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        username: action.payload.user.username,
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
        isLoggedIn: false
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

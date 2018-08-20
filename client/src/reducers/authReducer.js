import { USER_LOGIN, USER_LOGOUT, USER_SIGNUP } from '../actions/types'

const initialState = {
  username: 'not logged in',
  isLoggedIn: false,
  message: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        username: action.payload,
        isLoggedIn: true
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

import { USER_LOGIN, USER_LOGOUT } from '../actions/types'

const initialState = {
  username: 'not logged in',
  isLoggedIn: false
}

export default (state = initialState, action) => {
  switch(action.type) {
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
    default: {
      return state
    }
  }
}
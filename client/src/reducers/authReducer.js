import {
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_SIGNUP,
  USER_LOGIN_FAIL,
  CHECK_USER_LOGGEDIN
} from '../actions/types'

// import store from '../store'

// let isToken
// let username
// let userId
// if (localStorage.Authorization) {
//   isToken = true
//   username = localStorage.User
//   userId = localStorage.UserId
// } else {
//   isToken = false
// }

// let user = JSON.parse(localStorage.getItem('UserObject'))
// let user = JSON.parse(localStorage.User)

// const initialState = store.getState(). ? {
//   username: user.username,
//   userId: user.id,
//   isLoggedIn: true,
//   message: ''
// } : {
//   username: '',
//   userId: null,
//   isLoggedIn: false,
//   message: ''
// }
// console.log(store.getState())

const initialState = {
  username: '',
  userId: null,
  isLoggedIn: false,
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
    case CHECK_USER_LOGGEDIN:
      return {
        ...state,
        username: action.payload.username,
        isLoggedIn: true,
        userId: action.payload.id
      }
    default: {
      return state
    }
  }
}

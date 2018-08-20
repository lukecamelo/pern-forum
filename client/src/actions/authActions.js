import { USER_LOGIN, USER_LOGOUT } from './types'

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
    .catch(err => console.log(err))
}

export const userLogout = () => dispatch => {
  localStorage.clear('Authorization')
  dispatch({
    type: USER_LOGOUT
  })
}

import reducer from '../../reducers/authReducer'
import * as types from '../../actions/types'

const initialState = {
  username: '',
  userId: null,
  isLoggedIn: false,
  token: '',
  message: '',
}

const persistedState = {
  username: 'rediscover',
  userId: 1,
  isLoggedIn: true,
  message: 'Success!'
}

describe('auth reducer', () => {

  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle USER_LOGOUT', () => {
    const logoutAction = {
      type: types.USER_LOGOUT,
      username: 'not logged in',
      isLoggedIn: false,
      userId: null,
      message: ''
    }

    expect(reducer(initialState, logoutAction)).toEqual({
      ...initialState,
      username: 'not logged in',
      isLoggedIn: false,
      userId: null,
      message: ''
    })
  })

  it('should handle USER_LOGIN_SUCCESS', () => {
    const loginAction = {
      type: types.USER_LOGIN_SUCCESS,
      payload: {
        user: {
          username: 'rediscover',
          id: 1,
        },
        isLoggedIn: true,
        token: 'asejr23jifjoawjerawe.afsjlkdfjoi3j2423.asljdfkjo23ir',
        message: 'user logged in successfully!'
      }
    }

    expect(reducer(initialState, loginAction)).toEqual({
      ...initialState,
      username: 'rediscover',
      userId: 1,
      isLoggedIn: true,
      token: 'asejr23jifjoawjerawe.afsjlkdfjoi3j2423.asljdfkjo23ir',
      message: 'user logged in successfully!'
    })
  })

  it('should handle USER_LOGIN_FAIL', () => {
    const loginFailAction = {
      type: types.USER_LOGIN_FAIL,
      isLoggedIn: false,
      payload: 'epic fail!'
    }

    expect(reducer(initialState, loginFailAction)).toEqual({
      ...initialState,
      isLoggedIn: false,
      message: 'epic fail!'
    })
  })

  it('should handle USER_SIGNUP', () => {
    const signupAction = {
      type: types.USER_SIGNUP,
      payload: 'user created!'
    }

    expect(reducer(initialState, signupAction)).toEqual({
      ...initialState,
      message: 'user created!'
    })
  })
})

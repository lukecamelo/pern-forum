import configureStore from 'redux-mock-store'
import * as authActions from '../../actions/authActions'
import * as types from '../../actions/types'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const initialState = {}
const store = mockStore(initialState)

describe('auth actions', () => {
  beforeEach(() => {
    store.clearActions()
  })


  it('actually works', () => {
    store.dispatch(authActions.userLogout())
    const actions = store.getActions()
    const expectedPayload = { type: 'USER_LOGOUT' }
    expect(actions).toEqual([expectedPayload])
  })
})

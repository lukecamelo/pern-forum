import { combineReducers } from 'redux'
import testReducer from './testReducer'
import authReducer from './authReducer'

export default combineReducers({
  test: testReducer,
  auth: authReducer
})

import { combineReducers } from 'redux'
import threadReducer from './threadReducer'
import authReducer from './authReducer'

export default combineReducers({
  threadData: threadReducer,
  auth: authReducer
})

import { FETCH_DATA } from '../actions/types'

const initialState = {
  data: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case FETCH_DATA:
      return {
        ...state,
        data: action.payload
      }
    default:
      return state
  }
}
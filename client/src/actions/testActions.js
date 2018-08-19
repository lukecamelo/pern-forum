import { FETCH_DATA } from './types'

export const fetchData = () => dispatch => {
  fetch('/api/users')
    .then(res => res.json())
    .then(json => {
      dispatch({
        type: FETCH_DATA,
        payload: json
      })
    })
}
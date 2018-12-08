import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const initialState = {}
const middleware = [thunk]

const persistedState = localStorage.getItem('state')
  ? JSON.parse(localStorage.getItem('state'))
  : initialState

const store = createStore(
  rootReducer,
  persistedState,
  compose(
    applyMiddleware(...middleware)
    // Activates redux devtools
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

// Subscribes to state to keep localStorage out of reducers
store.subscribe(() => {
  localStorage.setItem('state', JSON.stringify(store.getState()))
})

export default store

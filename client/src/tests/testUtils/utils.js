// WORK IN PROGRESS, NOT CURRENTLY FUNCTIONAL

import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import App from '../../containers/App'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const initialState = {}
const store = mockStore(initialState)

export default function renderAppWithState() {
  const wrapper = mount(
    <Provider store={store}>
      <App />
    </Provider>
  )
  return [store, wrapper]
}

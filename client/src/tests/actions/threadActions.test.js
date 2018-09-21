import configureStore from 'redux-mock-store'
import * as threadActions from '../../actions/threadActions'

const mockStore = configureStore()
const store = mockStore()

describe('thread actions', () => {

  beforeEach(() => {
    store.clearActions()
  })

  it('Dispatches the correct action and payload', () => {

    const expectedActions = [
      {
        'payload': [],
        'type': 'fetchThreads'
      }
    ]

    // store.dispatch(threadActions.fetchThreads())
    // expect(store.getActions()).toEqual(expectedActions)

  })
})
import configureStore from 'redux-mock-store'
import * as threadActions from '../../actions/threadActions'
import * as types from '../../actions/types'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

const middleware = [thunk]
const mockStore = configureStore(middleware)

describe('thread actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('fetches the threads', () => {
    const store = mockStore({})
    fetchMock.getOnce('/thread/1/posts', {
      // payload: {
      //   threadPosts: [
      //     {
      //       author: 'rediscover',
      //       content: 'whats up',
      //       userId: 1,
      //       id: 1,
      //       threadId: 1
      //     }
      //   ]
      // },
      // headers: { 'content-type': 'application/json' }
    })
    
    // I DO NOT KNOW IF THIS IS ACTUALLY TESTING ANYTHING USEFUL LUL
    return store.dispatch(threadActions.fetchPosts(1)).then(() => {
      const actions = store.getActions()
      const expectedActions = { type: 'FETCH_POSTS', payload: {} }
      expect(actions).toEqual([expectedActions])
    })
  })
})

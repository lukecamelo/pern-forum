import configureStore from 'redux-mock-store'
import * as threadActions from '../../actions/threadActions'
import * as types from '../../actions/types'
import thunk from 'redux-thunk'
import moxios from 'moxios'
import axios from 'axios'

const middleware = [thunk]
const mockStore = configureStore(middleware)

describe('thread actions', () => {
  beforeEach(() => {
    moxios.install(axios)
  })

  afterEach(() => {
    moxios.uninstall(axios)
  })

  it('posts new threads', async done => {
    const store = mockStore({})
    const reqBody = {
      thread: {
        title: 'brand new thread',
        content: 'what a good thread',
        id: 1,
        userId: 1,
        subforumId: 1,
        subforum: {
          id: 1,
          name: 'General Discussion'
        },
        Post: [
          {
            author: 'rediscover',
            content: 'what a good thread',
            userId: 1,
            id: 1,
            threadId: 1
          }
        ]
      }
    }
    const threadData = {
      title: 'brand new thread',
      content: 'what a good thread',
      userId: 1,
      author: 'rediscover',
      subforumId: 1
    }

    moxios.stubRequest('/thread/threads', {
      status: 200,
      response: reqBody,
      headers: { 'Content-Type': 'application/json' }
    })

    return store.dispatch(threadActions.postNewThread(threadData)).then(() => {
      const actions = store.getActions()
      const expectedActions = {
        type: types.POST_NEW_THREAD,
        payload: {
          thread: {
            title: 'brand new thread',
            content: 'what a good thread',
            id: 1,
            userId: 1,
            subforumId: 1,
            subforum: {
              id: 1,
              name: 'General Discussion'
            },
            Post: [
              {
                author: 'rediscover',
                content: 'what a good thread',
                userId: 1,
                id: 1,
                threadId: 1
              }
            ]
          }
        }
      }
      expect(actions).toEqual([expectedActions])
      done()
    })
  })

  it('makes a new post', async done => {
    const store = mockStore({})
    const body = {
      content: 'hello',
      username: 'rediscover',
      userId: 1,
      threadId: 1
    }

    moxios.stubRequest('/thread/1/posts', {
      status: 200,
      response: body
    })

    return store
      .dispatch(threadActions.makeNewPost('hello', 'rediscover', 1, 1))
      .then(() => {
        const actions = store.getActions()
        const expectedActions = {
          type: types.MAKE_NEW_POST
        }
        expect(actions).toEqual([expectedActions])
        done()
      })
  })

  it('fetches users', async done => {
    const store = mockStore({})
    const payload = {
      users: [
        {
          username: 'charlie',
          id: 1,
          avatarUrl: 'imgur.com/picture.png',
          postCount: 4
        },
        {
          username: 'louise',
          id: 2,
          avatarUrl: 'imgur.com/chair.png',
          postCount: 3
        },
        {
          username: 'bronson',
          id: 3,
          avatarUrl: 'imgur.com/candle.png',
          postCount: 2
        }
      ]
    }

    moxios.stubRequest('/api/users', {
      status: 200,
      response: payload
    })

    return store.dispatch(threadActions.fetchData()).then(() => {
      const actions = store.getActions()
      const expectedActions = {
        type: types.FETCH_DATA,
        payload
      }
      expect(actions).toEqual([expectedActions])
      done()
    })
  })
})

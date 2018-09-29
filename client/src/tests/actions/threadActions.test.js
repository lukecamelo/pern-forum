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
      threadPosts: [
        {
          author: 'rediscover',
          content: 'whats up',
          userId: 1,
          id: 1,
          threadId: 1
        }
      ]
    })

    return store.dispatch(threadActions.fetchPosts(1)).then(() => {
      const actions = store.getActions()
      const expectedActions = {
        type: types.FETCH_POSTS,
        payload: {
          threadPosts: [
            {
              author: 'rediscover',
              content: 'whats up',
              userId: 1,
              id: 1,
              threadId: 1
            }
          ]
        }
      }
      expect(actions).toEqual([expectedActions])
    })
  })

  it('posts new threads', () => {
    const store = mockStore({})
    const reqBody = {
      thread: {
        title: 'brand new thread',
        content: 'what a good thread',
        id: 1,
        userId: 1,
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
      author: 'rediscover'
    }

    fetchMock.post('/thread/threads', {
      status: 200,
      body: reqBody,
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
    })
  })

  it('makes a new post', () => {
    const store = mockStore({})
    const body = {
      content: 'hello',
      username: 'rediscover',
      userId: 1,
      threadId: 1
    }
    fetchMock.post('/thread/1/posts', {
      status: 200,
      body
    })

    return store
      .dispatch(threadActions.makeNewPost('hello', 'rediscover', 1, 1))
      .then(() => {
        const actions = store.getActions()
        const expectedActions = {
          type: types.MAKE_NEW_POST,
          payload: {
            content: 'hello',
            username: 'rediscover',
            userId: 1,
            threadId: 1
          }
        }
        expect(actions).toEqual([expectedActions])
      })
  })

  it('fetches users', () => {
    const store = mockStore({})
    fetchMock.getOnce('/api/users', {
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
    })
    return store.dispatch(threadActions.fetchData()).then(() => {
      const actions = store.getActions()
      const expectedActions = {
        type: types.FETCH_DATA,
        payload: {
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
      }
      expect(actions).toEqual([expectedActions])
    })
  })
})

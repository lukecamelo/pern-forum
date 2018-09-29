// import React from 'react'
import reducer from '../../reducers/threadReducer'
import * as types from '../../actions/types'

const initialState = {
  users: [],
  threads: [],
  posts: []
}

describe('thread reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      users: [],
      threads: [],
      posts: []
    })
  })

  it('should handle FETCH_POSTS', () => {
    const fetchAction = {
      type: types.FETCH_POSTS,
      payload: [
        {
          author: 'rediscover',
          content: 'derp',
          userId: 1,
          id: 1,
          threadId: 1
        }
      ]
    }

    expect(reducer(initialState, fetchAction)).toEqual({
      ...initialState,
      posts: [
        { author: 'rediscover', content: 'derp', userId: 1, id: 1, threadId: 1 }
      ]
    })
  })

  it('should handle FETCH_THREADS', () => {
    const fetchThreadAction = {
      type: types.FETCH_THREADS,
      payload: [
        {
          id: 1,
          userId: 1,
          title: 'i love big beer',
          content: 'hop stoopid w00t!'
        }
      ]
    }

    expect(reducer(initialState, fetchThreadAction)).toEqual({
      ...initialState,
      threads: [
        {
          id: 1,
          userId: 1,
          title: 'i love big beer',
          content: 'hop stoopid w00t!'
        }
      ]
    })
  })

  it('should handle FETCH_DATA', () => {
    const fetchDataAction = {
      type: types.FETCH_DATA,
      payload: [
        {
          username: 'bronson',
          id: 1,
          avatarUrl: 'imgur.com/dog.png',
          postCount: 124
        },
        {
          username: 'ecko',
          id: 2,
          avatarUrl: 'imgur.com/cat.png',
          postCount: 86
        }
      ]
    }
    expect(reducer(initialState, fetchDataAction)).toEqual({
      ...initialState,
      users: [
        {
          username: 'bronson',
          id: 1,
          avatarUrl: 'imgur.com/dog.png',
          postCount: 124
        },
        {
          username: 'ecko',
          id: 2,
          avatarUrl: 'imgur.com/cat.png',
          postCount: 86
        }
      ]
    })
  })

  it('should handle POST_NEW_THREAD', () => {
    const postThreadAction = {
      type: types.POST_NEW_THREAD,
      payload: {
        title: 'test thread',
        content: 'i love my test thread',
        id: 1,
        userId: 1
      }
    }

    expect(reducer(initialState, postThreadAction)).toEqual({
      ...initialState,
      threads: [
        {
          title: 'test thread',
          content: 'i love my test thread',
          id: 1,
          userId: 1
        }
      ]
    })
  })

  it('should handle MAKE_NEW_POST', () => {
    const makePostAction = {
      type: types.MAKE_NEW_POST,
      payload: {
        author: 'charlie',
        content: 'henlo',
        id: 2,
        userId: 1,
        threadId: 2
      }
    }

    expect(reducer(initialState, makePostAction)).toEqual({
      ...initialState,
      posts: [
        {
          author: 'charlie',
          content: 'henlo',
          id: 2,
          userId: 1,
          threadId: 2
        }
      ]
    })
  })
})

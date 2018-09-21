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
})

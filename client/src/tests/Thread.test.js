import React from 'react'
import { Thread, ThreadHeader } from '../containers/Thread'
import { shallow } from 'enzyme'

describe('<Thread />', () => {
  it('renders thread content', () => {
    const props = {
      threads: [
        { title: 'hello', content: 'hello', id: 1, userId: 1 },
        { title: 'hello', content: 'hello', id: 1, userId: 1 },
        { title: 'hello', content: 'hello', id: 1, userId: 1 },
        { title: 'hello', content: 'hello', id: 1, userId: 1 }
      ],
      users: [
        { username: 'rediscover', password: 'password', id: 1 },
        { username: 'rediscover', password: 'password', id: 1 },
        { username: 'rediscover', password: 'password', id: 1 },
        { username: 'rediscover', password: 'password', id: 1 },
        { username: 'rediscover', password: 'password', id: 1 }
      ],
      match: {
        params: {
          id: 1
        }
      },
      posts: [
        { content: 'this is a test post!', threadId: 1, userId: 1 },
        { content: 'this is a test post!', threadId: 1, userId: 1 },
        { content: 'this is a test post!', threadId: 1, userId: 1 },
        { content: 'this is a test post!', threadId: 1, userId: 1 },
        { content: 'this is a test post!', threadId: 1, userId: 1 },
      ],
      fetchPosts: () => [],
      fetchData: () => [],
      fetchThreads: () => []
    }
    const wrapper = shallow(<Thread {...props} />)
    console.log(
      wrapper
        .find(ThreadHeader)
        .childAt(0)
        .debug()
    )
  })
})

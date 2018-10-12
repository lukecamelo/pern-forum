import React from 'react'
import { Thread } from '../containers/Thread'
import { Container } from '../styled/index'
import { shallow } from 'enzyme'
import PostList from '../components/PostList'

describe('<Thread />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<Thread match={{ params: { id: 1 } }} />)
  })

  it('fetches the thread', async () => {
    expect(wrapper.find(Container).length).toEqual(1)
  })

  it('renders pagination/posts if they exist', () => {
    wrapper.setState({
      threadPosts: [
        {
          id: 1,
          author: 'rediscover',
          content: 'hello',
          threadId: 1,
          createdAt: '2018-09-30T21:02:37.951Z',
          user: {
            postCount: 2,
            avatarUrl: 'avatar.com',
            createdAt: '2018-09-30T21:02:37.951Z'
          }
        },
        {
          id: 2,
          author: 'bradley',
          content: 'arigato',
          threadId: 1,
          createdAt: '2018-09-30T21:02:37.951Z',
          user: {
            postCount: 2,
            avatarUrl: 'avatar.com',
            createdAt: '2018-09-30T21:02:37.951Z'
          }
        },
        {
          id: 3,
          author: 'john',
          content: 'bye bye',
          threadId: 1,
          createdAt: '2018-09-30T21:02:37.951Z',
          user: {
            postCount: 2,
            avatarUrl: 'avatar.com',
            createdAt: '2018-09-30T21:02:37.951Z'
          }
        }
      ],
      threadHasLoaded: true
    })
    wrapper.update()
    expect(wrapper.find(PostList).length).toEqual(1)
    wrapper.setState({ threadPosts: [] })
    expect(wrapper.find(PostList).length).toEqual(0)
  })
})

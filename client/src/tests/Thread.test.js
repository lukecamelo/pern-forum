import React from 'react'
import { Thread } from '../containers/Thread'
import Pagination from '../components/Pagination'
import { Container } from '../styled/index'
import Post from '../styled/Post'
import { shallow } from 'enzyme'

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
          user: { postCount: 2, avatarUrl: 'avatar.com' }
        },
        {
          id: 2,
          author: 'bradley',
          content: 'arigato',
          threadId: 1,
          user: { postCount: 2, avatarUrl: 'avatar.com' }
        },
        {
          id: 3,
          author: 'john',
          content: 'bye bye',
          threadId: 1,
          user: { postCount: 2, avatarUrl: 'avatar.com' }
        }
      ],
      threadHasLoaded: true
    })
    expect(wrapper.find(Pagination).length).toEqual(1)
    wrapper.setState({ threadPosts: [] })
    expect(wrapper.find(Pagination).length).toEqual(0)
  })

  it("renders each posts' postCount ", () => {
    wrapper.setState({
      threadPosts: [
        {
          author: 'rediscover',
          content: 'hello',
          threadId: 1,
          user: { postCount: 2, avatarUrl: 'avatar.com' }
        },
        {
          author: 'bradley',
          content: 'arigato',
          threadId: 1,
          user: { postCount: 2, avatarUrl: 'avatar.com' }
        },
        {
          author: 'john',
          content: 'bye bye',
          threadId: 1,
          user: { postCount: 2, avatarUrl: 'avatar.com' }
        }
      ],
      threadHasLoaded: true
    })
    
    let post = wrapper
      .find(Post)
      .at(0)
      .childAt(0)

    expect(post.find('p').text()).toEqual(
      'post count: ' + wrapper.state('threadPosts')[0].user.postCount
    )
  })
})

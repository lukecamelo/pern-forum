import React from 'react'
import { ThreadList, ListWrapper } from '../containers/ThreadList'
import { shallow } from 'enzyme'

describe('<ThreadList />', () => {
  let props, wrapper
  beforeEach(() => {
    props = {
      users: [
        { username: 'user1', password: 'pass', id: 1 },
        { username: 'user2', password: 'passw', id: 2 },
        { username: 'user3', password: 'passdf', id: 3 },
        { username: 'user4', password: 'passgew', id: 4 },
        { username: 'user5', password: 'passqqq', id: 5 }
      ],
      data: [
        { title: 'ohaio', content: 'moshi moshi', id: 1, userId: 1 },
        { title: 'ohaio', content: 'moshi moshi', id: 2, userId: 3 },
        { title: 'ohaio', content: 'moshi moshi', id: 3, userId: 4 },
        { title: 'ohaio', content: 'moshi moshi', id: 4, userId: 5 },
        { title: 'ohaio', content: 'moshi moshi', id: 5, userId: 4 },
        { title: 'ohaio', content: 'moshi moshi', id: 6, userId: 3 }
      ],
      fetchData: () => []
    }
    wrapper = shallow(<ThreadList {...props} />)
  })

  it('renders the correct number of thread links', () => {
    expect(wrapper.find(ListWrapper).children().length).toEqual(6)
  })

  it('renders the correct thread authors', () => {
    wrapper.find('strong').forEach((child, i) => {
      expect(child.text()).toEqual('user' + props.data[i].userId)
    })
  })
})

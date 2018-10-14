import React from 'react'
import { ThreadForm } from '../components/ThreadForm'
import ReactMde from 'react-mde'
import { StyledLink } from '../styled'
import { shallow } from 'enzyme'

describe('<ThreadForm />', () => {
  let props, wrapper, spy
  beforeEach(() => {
    props = {
      users: [
        { username: 'user1', password: 'pass', id: 1 },
        { username: 'user2', password: 'passw', id: 2 },
        { username: 'user3', password: 'passdf', id: 3 },
        { username: 'user4', password: 'passgew', id: 4 },
        { username: 'user5', password: 'passqqq', id: 5 }
      ],
      auth: {
        username: 'rediscover',
        userId: 1,
        isLoggedIn: true,
      },
      loggedInUserId: 1,
      username: 'rediscover',
      // postNewThread: (title, content, userId, author) => null,
      fetchThreads: () => null
    }
    spy = jest.fn()
    wrapper = shallow(<ThreadForm {...props} postNewThread={spy} />)
  })

  it('posts thread on button click', () => {
    wrapper.instance().setState({ mdeState: { html: '<p>this is a test</p>' } })
    wrapper.find(StyledLink).simulate('click')
    expect(spy).toHaveBeenCalled()
  })
  
  it('changes state onChange', () => {
    const newState = '<h1>no i mean it!</h1>'
    wrapper.find(ReactMde).simulate('change', newState)
    expect(wrapper.instance().state.mdeState).toEqual(newState)
  })
  
})

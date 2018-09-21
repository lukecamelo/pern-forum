import React from 'react'
import { ThreadForm } from '../components/ThreadForm'
import ReactMde from 'react-mde'
import { Link } from 'react-router-dom'
import { shallow } from 'enzyme'
import sinon from 'sinon'

describe('<ThreadForm />', () => {
  let props, wrapper, fetchThreads, postNewThread
  beforeEach(() => {
    props = {
      users: [
        { username: 'user1', password: 'pass', id: 1 },
        { username: 'user2', password: 'passw', id: 2 },
        { username: 'user3', password: 'passdf', id: 3 },
        { username: 'user4', password: 'passgew', id: 4 },
        { username: 'user5', password: 'passqqq', id: 5 }
      ],
      loggedInUserId: 1,
      username: 'rediscover',
      postNewThread: (title, content, userId, author) => null,
      fetchThreads: () => null
    }

    fetchThreads = sinon.stub(props, 'fetchThreads')
    postNewThread = sinon.stub(props, 'postNewThread')

    wrapper = shallow(<ThreadForm {...props} />)
  })

  it('posts thread on button click', () => {
    wrapper.instance().setState({ mdeState: { html: '<p>fuck me</p>' } })
    wrapper.find(Link).simulate('click')
    expect(postNewThread.calledOnce).toBe(true)
  })

  it('changes state onChange', () => {
    const newState = '<h1>no i mean it!</h1>'
    wrapper.find(ReactMde).simulate('change', newState)
    expect(wrapper.instance().state.mdeState).toEqual(newState)
  })
})
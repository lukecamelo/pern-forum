import React from 'react'
import { PostForm } from '../components/PostForm'
import { shallow } from 'enzyme'

describe('<PostForm />', () => {
  let wrapper, props, makeNewPost
  beforeEach(() => {
    props = {
      threadId: 1,
      auth: {
        username: 'rediscover',
        userId: 1,
        isLoggedIn: true,
        token: 'aslkdfjl2k3j4.jslkdjf3j2.aslkdfjao34',
        message: 'Success!'
      },
      makeNewPost: jest.fn()
    }

    wrapper = shallow(<PostForm {...props} />)
  })

  it('renders without crashing', () => {
    expect(wrapper.find('form').length).toEqual(1)
  })

  it('calls handleSubmit on form submit', () => {
    wrapper.instance().handleSubmit = jest.fn()
    wrapper.setState({ mdeState: { html: '<p>this is a test</p>' } })
    wrapper.find('form').simulate('submit', { preventDefault() {} })
    expect(wrapper.instance().handleSubmit).toHaveBeenCalled()
  })
  
  it('calls makeNewPost when handleSubmit is called', () => {
    wrapper.setState({ mdeState: { html: '<p>this is a test</p>' } })
    wrapper.instance().handleSubmit()
    expect(props.makeNewPost.mock.calls.length).toEqual(1)
  })
  
  it('sends all necessary data via makeNewPost', () => {
    wrapper.setState({ mdeState: { html: '<p>this is a test</p>' } })
    wrapper.instance().handleSubmit()
    expect(props.makeNewPost).toHaveBeenCalledWith(
      wrapper.state('mdeState').html,
      props.auth.username,
      props.auth.userId,
      props.threadId
    )
  })

})

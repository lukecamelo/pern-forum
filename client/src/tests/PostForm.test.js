import React from 'react'
import { PostForm } from '../components/PostForm'
import Form from '../styled/Form'
import { Button } from '../styled'
import { shallow } from 'enzyme'

import { DraftUtil } from 'react-mde'

describe('<PostForm />', () => {
  let wrapper, props, spy
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
      // makeNewPost: () => null
    }
    spy = jest.fn()
    wrapper = shallow(<PostForm {...props} submit={spy} />)
  })

  it('renders without crashing', () => {
    expect(wrapper.find(Form).length).toEqual(1)
  })
  
  /* ----- TESTS CURRENTLY BROKEN ----- */

  // // Needs to be reworked
  // // it('calls handleSubmit on form submit', () => {
  // //   wrapper.instance().handleSubmit = jest.fn()
  // //   wrapper.setState({ mdeState: { html: '<p>this is a test</p>' } })
  // //   wrapper.find('form').simulate('submit', { preventDefault() {} })
  // //   expect(wrapper.instance().handleSubmit).toHaveBeenCalled()
  // // })

  // it('calls makeNewPost when handleSubmit is called', () => {
  //   wrapper.setState({ mdeState: { html: '<p>this is a test</p>' } })
  //   wrapper.find(Button).simulate('click')
  //   expect(spy).toHaveBeenCalled()
  // })

  // it('sends all necessary data via makeNewPost', () => {
  //   wrapper.setState({ mdeState: { html: '<p>this is a test</p>' } })
  //   expect(spy).toHaveBeenCalledWith(
  //     wrapper.state('mdeState').html,
  //     props.auth.username,
  //     props.auth.userId,
  //     props.threadId
  //   )
  // })
})

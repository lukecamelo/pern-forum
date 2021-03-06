import React from 'react'
import { Signup } from '../components/Signup'
import Form from '../styled/Form'
import { shallow } from 'enzyme'
import sinon from 'sinon'

describe('<Signup />', () => {
  let wrapper, props, userSignup, mockStore
  beforeEach(() => {
    props = {
      message: '',
      isLoggedIn: false,
      userSignup: () => null
    }

    userSignup = sinon.stub(props, 'userSignup')
    wrapper = shallow(<Signup {...props} />)
  })

  it('renders without crashing', () => {
    expect(wrapper.find(Form.Input).length).toEqual(3)
  })

  it('checks avatar validity onChange', () => {
    wrapper.instance().avatarChangeHandler = jest.fn()
    wrapper.instance().checkUrlExists = jest.fn()

    wrapper.update()

    const event = { target: { name: 'avatarUrl', value: 'fuggedaboudit' } }
    wrapper
      .instance()
      .avatarChangeHandler.call({ state: { avatarUrlInput: '' } }, event)

    expect(wrapper.instance().avatarChangeHandler).toBeCalled()
  })
})

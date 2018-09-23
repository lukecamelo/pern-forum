import React from 'react'
import { UserControlPanel } from '../components/UserControlPanel'
import { Button, Input } from '../styled/index'
import { shallow } from 'enzyme'

describe('<UserControlPanel />', () => {
  let props, wrapper
  beforeEach(() => {
    props = {
      user: {
        username: 'rediscover',
        userId: 1,
      }
    }
    wrapper = shallow(<UserControlPanel  {...props} />)
  })

  it('renders without crashing', () => {
    expect(wrapper.find(Button).length).toEqual(1)
  })

  it('calls editAvatar function on button click', () => {
    wrapper.instance().editAvatar = jest.fn()
    wrapper.find(Button).simulate('click')
    expect(wrapper.instance().editAvatar).toBeCalled()
  })

  it('instantiates with the proper avatar URL', () => {
    wrapper.setState({ avatarUrl: 'https://m.imgur.com/rereavatar.png' })
    expect(wrapper.find(Input).props().value).toEqual(wrapper.state('avatarUrl'))
  })
})

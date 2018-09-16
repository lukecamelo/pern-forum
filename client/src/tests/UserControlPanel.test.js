import React from 'react'
import { UserControlPanel } from '../components/UserControlPanel'
import { Button } from '../components/Login'
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
})

import React from 'react'
import { Signup } from '../components/Signup'
import { Input } from '../components/Login'
import { shallow } from 'enzyme'

describe('<Signup />', () => {

  let wrapper
  beforeEach(() => {
    const wrapper = shallow(<Signup />)
  })

  it('renders without crashing', () => {
    expect(wrapper.find(Input).length).toEqual(3)
  })

})
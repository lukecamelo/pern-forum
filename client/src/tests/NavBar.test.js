import React from 'react'
import { NavBar } from '../components/NavBar'
import ResponsiveMenu from 'react-responsive-navbar'
import { Link } from 'react-router-dom'
import { shallow } from 'enzyme'

describe('<NavBar />', () => {

  let wrapper, props
  beforeEach(() => {
    props = {
      isLoggedIn: false,
      userLogout: () => null
    }
    wrapper = shallow(<NavBar {...props} />)
  })

  it('renders without crashing', () => {
    expect(wrapper.find(ResponsiveMenu).length).toEqual(1)
    // wrapper.setProps({ isLoggedIn: true })
    // expect(wrapper.find(Link).length).toEqual(3)
  })

})
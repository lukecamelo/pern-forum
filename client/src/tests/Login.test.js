import React from 'react'
import { Login } from '../components/Login'
import { Input, Button } from '../styled/index'
import { shallow } from 'enzyme'

describe('<Login />', () => {

  let props, wrapper, spy
  beforeEach(() => {
     props = {
      auth: {
        isLoggedIn: false,
        message: "",
        userId: null,
        username: "not logged in"
      },
      userLogout: jest.fn()
    }
    spy = jest.fn()
    wrapper = shallow(<Login {...props} userLogin={spy}  />)
  })

  it('have the correct number of inputs (dummy test, really)', () => {
    expect(wrapper.find(Input).length).toEqual(2)
  })

  it('calls userLogin on Login button click', () => {
    wrapper.find(Button).simulate('click', { preventDefault() {} })
    expect(spy).toHaveBeenCalled()
  })

})
import React from 'react'
import { Login } from '../components/Login'
import Form from '../styled/Form'
import { shallow } from 'enzyme'

describe('<Login />', () => {
  let props, wrapper, spy
  beforeEach(() => {
    props = {
      auth: {
        isLoggedIn: false,
        message: '',
        userId: null,
        username: 'not logged in'
      },
      userLogout: jest.fn()
    }
    spy = jest.fn()
    wrapper = shallow(<Login {...props} userLogin={spy} />)
  })

  it('have the correct number of inputs (dummy test, really)', () => {
    expect(wrapper.find(Form.Input).length).toEqual(2)
  })
})

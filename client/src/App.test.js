import React from 'react'
import { App } from './containers/App'
import { shallow } from 'enzyme'
import { NavBar } from './components/NavBar'

it('renders without crashing', () => {
  const props = {
    threads: [
      { title: 'hello', content: 'hello hello', userId: 1, id: 1 },
      { title: 'hello', content: 'hello hello', userId: 1, id: 1 },
      { title: 'hello', content: 'hello hello', userId: 1, id: 1 }
    ],
    fetchThreads: jest.fn(),
    fetchData: jest.fn(),
    isLoggedIn: true
  }

  const wrapper = shallow(<App {...props} />)
  expect(wrapper.find(NavBar)).to.have.lengthOf(1)
  // expect(wrapper.props().isLoggedIn).toEqual(true)
  // expect(wrapper.props().isLoggedIn).toEqual(false)
})

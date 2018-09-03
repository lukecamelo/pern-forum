import React from 'react'
import { App } from './containers/App'
import { shallow } from 'enzyme'
import NavBar from './components/NavBar'
import Pagination from './components/Pagination'

describe('renders without crashing', () => {
  let wrapper, props
  beforeEach(() => {
    props = {
      threads: [
        { title: 'hello', content: 'hello hello', userId: 1, id: 1 },
        { title: 'hello', content: 'hello hello', userId: 1, id: 1 },
        { title: 'hello', content: 'hello hello', userId: 1, id: 1 }
      ],
      fetchThreads: () => [],
      fetchData: () => [],
      isLoggedIn: true
    }
    wrapper = shallow(<App {...props} />)
  })

  it('renders children', () => {
    expect(wrapper.find(Pagination).length).toEqual(1)
    expect(wrapper.find(NavBar).length).toEqual(1)
  })
})

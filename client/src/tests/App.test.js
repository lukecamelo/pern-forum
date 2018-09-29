import React from 'react'
import PropTypes from 'prop-types'
import { App } from '../containers/App'
import { shallow } from 'enzyme'
import NavBar from '../components/NavBar'
import Pagination from '../components/Pagination'

import renderAppWithState from './testUtils/utils'

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
      checkUserLoggedIn: () => null,
      isLoggedIn: true,
      match: {
        params: {
          page: 1
        }
      }
    }
    wrapper = shallow(<App {...props} />, {
      context: {
        router: {
          history: {
            push: () => {},
            replace: () => {},
            createHref: () => {}
          }
        }
      },
      childContextTypes: {
        router: PropTypes.object.isRequired
      }
    })
  })

  it('renders children', () => {
    expect(wrapper.find(Pagination).length).toEqual(1)
    expect(wrapper.find(NavBar).length).toEqual(1)
  })

  it('only renders posts if isLoggedIn equals true', () => {
    expect(wrapper.find(Pagination).length).toEqual(1)
    wrapper.setProps({ isLoggedIn: false })
    expect(wrapper.find(Pagination).length).toEqual(0)
  })

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

})

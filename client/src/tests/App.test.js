import React from 'react'
import PropTypes from 'prop-types'
import { App } from '../containers/App'
import { shallow } from 'enzyme'
import NavBar from '../components/NavBar'
import SubforumList from '../containers/SubforumList'

// Stuff for future integration testing
// import setupStore from './testUtils/utils'
// import { Provider } from 'react-redux'
// import { MemoryRouter } from 'react-router-dom'

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
    expect(wrapper.find(SubforumList).length).toEqual(1)
    expect(wrapper.find(NavBar).length).toEqual(1)
  })

  // it('matches snapshot', () => {
  //   const store = setupStore({})
  //   wrapper = mount(
  //     <MemoryRouter>
  //       <Provider store={store}>
  //         <App  {...props} />
  //       </Provider>
  //     </MemoryRouter>
  //   )
  // })
})

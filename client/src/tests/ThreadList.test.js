import React from 'react'
import PropTypes from 'prop-types'
import { ThreadList } from '../containers/ThreadList'
import Loader from '../components/Loader'
import { mount } from 'enzyme'
import sinon from 'sinon'

describe('<ThreadList />', () => {
  let props, wrapper, fetchData, fetchSubforumThreads, spy

  beforeEach(() => {
    props = {
      users: [
        { username: 'user1', password: 'pass', id: 1 },
        { username: 'user2', password: 'passw', id: 2 },
        { username: 'user3', password: 'passdf', id: 3 },
        { username: 'user4', password: 'passgew', id: 4 },
        { username: 'user5', password: 'passqqq', id: 5 }
      ],
      data: [
        {
          title: 'ohaio',
          content: 'moshi moshi',
          id: 1,
          userId: 1,
          Post: [{}],
          subforumId: 1,
          subforum: {
            id: 1,
            name: 'General Discussion'
          }
        },
        {
          title: 'i am a pirate',
          content: 'arrrr',
          id: 2,
          userId: 3,
          Post: [{}],
          subforumId: 1,
          subforum: {
            id: 1,
            name: 'General Discussion'
          }
        },
        {
          title: 'ftw',
          content: 'motorcycle man',
          id: 3,
          userId: 4,
          Post: [{}],
          subforumId: 1,
          subforum: {
            id: 1,
            name: 'General Discussion'
          }
        },
        {
          title: 'rainbow',
          content: 'pencil shavings',
          id: 4,
          userId: 5,
          Post: [{}],
          subforumId: 1,
          subforum: {
            id: 1,
            name: 'General Discussion'
          }
        },
        {
          title: 'carrot stick',
          content: 'i am a monster',
          id: 5,
          userId: 4,
          Post: [{}],
          subforumId: 1,
          subforum: {
            id: 1,
            name: 'General Discussion'
          }
        },
        {
          title: 'i eat gravy',
          content: 'its really bad for me',
          id: 6,
          userId: 3,
          Post: [{}],
          subforumId: 1,
          subforum: {
            id: 1,
            name: 'General Discussion'
          }
        }
      ],
      fetchData: () => []
    }

    spy = jest.fn()
    fetchData = sinon.stub(props, 'fetchData')
    // fetchSubforumThreads = sinon.stub(props, 'fetchSubforumThreads')

    wrapper = mount(<ThreadList {...props} fetchSubforumThreads={spy} />, {
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

  afterEach(() => {
    fetchData.reset()
  })

  it('renders the correct number of thread links', () => {
    wrapper.setState({ hasLoaded: true })
    expect(wrapper.find('main').children().length).toEqual(6)
  })

  it('renders the correct thread authors', () => {
    wrapper.find('div.thread-author').forEach((child, i) => {
      // not sure how to select the second p tag so Authoruser is a lil hack to get around it
      expect(child.text()).toEqual('Authoruser' + props.data[i].userId)
    })
  })

  it('shows loading header if threads not loaded', () => {
    wrapper.setState({ hasLoaded: false })
    expect(wrapper.find(Loader).length).toEqual(1)
    wrapper.setState({ hasLoaded: true })
    expect(wrapper.find(Loader).length).toEqual(0)
  })

  it('fetches data on componentDidMount', () => {
    const componentDidMountSpy = sinon.spy(
      ThreadList.prototype,
      'componentDidMount'
    )
    expect(fetchData.calledOnce).toBe(true)
    componentDidMountSpy.restore()
  })
})

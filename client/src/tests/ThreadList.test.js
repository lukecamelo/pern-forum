import React from 'react'
import PropTypes from 'prop-types'
import { ThreadList } from '../containers/ThreadList'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'

describe('<ThreadList />', () => {
  let props, wrapper, fetchData, fetchThreads

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
        { title: 'ohaio', content: 'moshi moshi', id: 1, userId: 1, Post: [{}] },
        { title: 'i am a pirate', content: 'arrrr', id: 2, userId: 3, Post: [{}] },
        { title: 'ftw', content: 'motorcycle man', id: 3, userId: 4, Post: [{}] },
        { title: 'rainbow', content: 'pencil shavings', id: 4, userId: 5, Post: [{}] },
        { title: 'carrot stick', content: 'i am a monster', id: 5, userId: 4, Post: [{}] },
        { title: 'i eat gravy', content: 'its really bad for me', id: 6, userId: 3, Post: [{}] }
      ],
      fetchData: () => [],
      fetchThreads: () => []
    }

    fetchData = sinon.stub(props, 'fetchData')
    fetchThreads = sinon.stub(props, 'fetchThreads')

    wrapper = mount(<ThreadList {...props} />, {
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
      },
    })
  })

  afterEach(() => {
    fetchData.reset()
  })

  it('renders the correct number of thread links', () => {
    expect(wrapper.find('main').children().length).toEqual(6)
  })

  it('renders the correct thread authors', () => {
    wrapper.find('div.thread-author').forEach((child, i) => {
      // not sure how to select the second p tag so Authoruser is a lil hack to get around it
      expect(child.text()).toEqual('Authoruser' + props.data[i].userId)
    })
  })

  it('shows loading header if threads not loaded', () => {
    expect(wrapper.find('#loading-header').length).toEqual(0)
    wrapper.setProps({ data: [] })
    expect(wrapper.find('#loading-header').length).toEqual(1)
  })

  it('fetches data on componentDidMount', () => {
    const componentDidMountSpy = sinon.spy(ThreadList.prototype, 'componentDidMount')
    expect(fetchData.calledOnce).toBe(true)
    componentDidMountSpy.restore()
  })

  it('fetches threads on componentDidMount', () => {
    const componentDidMountSpy = sinon.spy(ThreadList.prototype, 'componentDidMount')
    expect(fetchThreads.calledOnce).toBe(true)
    componentDidMountSpy.restore()
  })
})

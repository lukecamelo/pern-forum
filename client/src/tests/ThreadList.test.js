import React from 'react'
import PropTypes from 'prop-types'
import { ThreadList, ListWrapper } from '../containers/ThreadList'
import { shallow, mount } from 'enzyme'
import sinon, { spy } from 'sinon'

describe('<ThreadList />', () => {
  let props, wrapper, fetchData, spy
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
        { title: 'ohaio', content: 'moshi moshi', id: 1, userId: 1 },
        { title: 'i am a pirate', content: 'arrrr', id: 2, userId: 3 },
        { title: 'ftw', content: 'motorcycle man', id: 3, userId: 4 },
        { title: 'rainbow', content: 'pencil shavings', id: 4, userId: 5 },
        { title: 'carrot stick', content: 'i am a monster', id: 5, userId: 4 },
        { title: 'i eat gravy', content: 'its really bad for me', id: 6, userId: 3 }
      ],
      fetchData: () => []
    }

    fetchData = sinon.stub(props, 'fetchData')

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
    wrapper.find('strong').forEach((child, i) => {
      expect(child.text()).toEqual('user' + props.data[i].userId)
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
    // expect(ThreadList.prototype.componentDidMount.calledOnce)
    componentDidMountSpy.restore()
  })
})

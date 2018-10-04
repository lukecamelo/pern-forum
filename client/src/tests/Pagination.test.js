import React from 'react'
import Pagination from '../components/Pagination'
import { ThreadList } from '../containers/ThreadList'
import { Link } from 'react-router-dom'
import { shallow } from 'enzyme'

describe('<Pagination />', () => {
  let props, wrapper
  beforeEach(() => {
    props = {
      data: [
        { title: 'hello', content: 'hello hello', userId: 1, id: 1 },
        { title: 'hello', content: 'hello hello', userId: 1, id: 1 },
        { title: 'hello', content: 'hello hello', userId: 1, id: 1 },
        { title: 'hello', content: 'hello hello', userId: 1, id: 1 },
        { title: 'hello', content: 'hello hello', userId: 1, id: 1 },
        { title: 'hello', content: 'hello hello', userId: 1, id: 1 },
        { title: 'hello', content: 'hello hello', userId: 1, id: 1 },
        { title: 'hello', content: 'hello hello', userId: 1, id: 1 },
        { title: 'hello', content: 'hello hello', userId: 1, id: 1 },
        { title: 'hello', content: 'hello hello', userId: 1, id: 1 },
        { title: 'hello', content: 'hello hello', userId: 1, id: 1 },
        { title: 'hello', content: 'hello hello', userId: 1, id: 1 },
        { title: 'hello', content: 'hello hello', userId: 1, id: 1 },
        { title: 'hello', content: 'hello hello', userId: 1, id: 1 },
        { title: 'hello', content: 'hello hello', userId: 1, id: 1 },
        { title: 'hello', content: 'hello hello', userId: 1, id: 1 },
        { title: 'hello', content: 'hello hello', userId: 1, id: 1 },
        { title: 'hello', content: 'hello hello', userId: 1, id: 1 },
        { title: 'hello', content: 'hello hello', userId: 1, id: 1 },
        { title: 'hello', content: 'hello hello', userId: 1, id: 1 },
        { title: 'hello', content: 'hello hello', userId: 1, id: 1 }
      ],
      match: {
        params: {
          page: 1
        }
      }
    }
    wrapper = shallow(
      <Pagination
        data={props.data}
        currentPage={props.match.params.page}
        context="threads"
      >
        {data => <ThreadList data={data} />}
      </Pagination>
    )
  })

  it('renders children (page buttons)', () => {
    expect(
      wrapper
        .find('div.pagination-results')
        .children()
        .exists()
    ).toEqual(true)
  })

  it('renders the correct number of page buttons', () => {
    // given 12 items
    expect(wrapper.find('div.pagination-controls').children().length).toEqual(2)
  })

  it('changes active page on click', () => {
    wrapper
      .find(Link)
      .last()
      .simulate('click')

    expect(
      wrapper
        .find(Link)
        .last()
        .hasClass('pagination-controls__button--active')
    ).toEqual(true)
  })

  it('renders post links for Threads and thread links for ThreadList', () => {
    wrapper.setProps({ threadId: 1, context: 'posts' })
    expect(
      wrapper
        .find(Link)
        .at(0)
        .props().to
    ).toEqual('/thread/1/page/1')
    
    wrapper.setProps({ context: 'threads', currentPage: 1 })
    expect(
      wrapper
        .find(Link)
        .at(0)
        .props().to
    ).toEqual('/threads/1')
  })
})

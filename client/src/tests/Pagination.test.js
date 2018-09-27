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

    /* ----- Optimized version that does not work ----- */
    // wrapper.find('div.pagination-controls').children().forEach(node => {
    //   node.simulate('click')
    //   expect(node.hasClass('pagination-controls__button--active')).toEqual(true)
    // })
  })
})

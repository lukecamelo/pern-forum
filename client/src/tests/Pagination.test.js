import React from 'react'
import Pagination from '../components/Pagination'
import { ThreadList } from '../containers/ThreadList'
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
    }
    wrapper = shallow(
      <Pagination {...props}>
        <ThreadList />
      </Pagination>
    )
  })

  it('renders children', () => {
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
})

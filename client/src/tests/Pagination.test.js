import React from 'react'
import Pagination from '../components/Pagination'
import { shallow } from 'enzyme'

describe('<Pagination />', () => {

  let props, wrapper
  beforeEach(() => {
    props = {
      data: [
        { title: 'hello', content: 'hello hello', userId: 1, id: 1 },
        { title: 'hello', content: 'hello hello', userId: 1, id: 1 },
        { title: 'hello', content: 'hello hello', userId: 1, id: 1 }
      ],
      pageSize: 10
    }
    wrapper = shallow(
      <Pagination {...props}>
        <div id='pagination-child'>
          <h1>hello!</h1>
        </div>
      </Pagination>
    )
  })

  it('renders children', () => {
    expect(wrapper.find('div.pagination-results').children().exists()).toEqual(true)
  })

})

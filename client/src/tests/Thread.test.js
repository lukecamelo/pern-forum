import React from 'react'
import { Thread, ThreadHeader } from '../containers/Thread'
import { shallow } from 'enzyme'

describe('<Thread />', () => {
  it('renders thread content', () => {
    const props = {
      match: {
        params: {
          id: 1
        }
      }
    }
    // const wrapper = shallow(<Thread match={{ params: { id: 1 } }} />)
    // expect(wrapper.find(ThreadHeader).length).toEqual(1)
  })
})

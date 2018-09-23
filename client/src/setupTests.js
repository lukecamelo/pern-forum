import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
require ('jest-localstorage-mock')

configure({ adapter: new Adapter() })

// global.XMLHttpRequest = undefined

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
}
global.localStorage = localStorageMock


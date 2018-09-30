import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
require ('jest-localstorage-mock')

configure({ adapter: new Adapter() })

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
}
global.localStorage = localStorageMock

const mockNoop = () => new Promise(() => {});

// axios mock stuff that does not work
jest.mock('axios', () => ({
  default: mockNoop,
  get: mockNoop,
  post: mockNoop,
  put: mockNoop,
  delete: mockNoop,
  patch: mockNoop
}));


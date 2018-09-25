import styled from 'styled-components'
import { slideInLeft } from '../keyframes/index'

const User = styled.div`
  margin-right: 1em;
  animation: ${slideInLeft} 0.4s cubic-bezier(0.28, 1, 0.14, 0.99);
`

export default User
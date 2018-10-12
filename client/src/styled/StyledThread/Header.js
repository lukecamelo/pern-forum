import styled from 'styled-components'
import slideInRight from '../../containers/Thread'

const Header = styled.div`
  background-color: #0266c8;
  color: white;
  margin-top: 2em;
  margin-bottom: 0;
  padding: 1em;
  text-align: left;
  animation: ${slideInRight} 0.4s cubic-bezier(0.28, 1, 0.14, 0.99);
`

export default Header
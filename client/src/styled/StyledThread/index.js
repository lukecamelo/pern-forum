import styled from 'styled-components'
import Header from './Header';
import Body from './Body';

const StyledThread = styled.section`
  background-color: #dff4ff;
  color: #564154;
  padding: 2em;
`

StyledThread.Header = Header
StyledThread.Body = Body

export default StyledThread
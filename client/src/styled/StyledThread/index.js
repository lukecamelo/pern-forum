import styled from 'styled-components'
import Header from './Header';
import Body from './Body';
import Navigation from './Navigation'

const StyledThread = styled.section`
  background-color: rgb(229, 235, 247);
  color: #564154;
  margin: 0 auto;
  width: 75vw;
  @media screen and (max-width: 700px) {
    width: 90vw;
  }
`

StyledThread.Header = Header
StyledThread.Body = Body
StyledThread.Navigation = Navigation

export default StyledThread
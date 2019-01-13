import styled from 'styled-components'
import SubContainer from './SubContainer'
import SubLink from './SubLink'
import LinkContainer from './LinkContainer'

const StyledSubList = styled.section`
  width: 75vw;
  margin: 0 auto 2em auto;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.12), 0 2px 4px 0 rgba(0, 0, 0, 0.08);
  overflow: hidden;
  @media screen and (max-width: 700px) {
    width: 90vw;
  }
`

StyledSubList.SubContainer = SubContainer
StyledSubList.SubLink = SubLink
StyledSubList.LinkContainer = LinkContainer

export default StyledSubList

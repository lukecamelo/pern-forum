import styled from 'styled-components'
import LatestLink from './LatestLink'
import InfoText from './InfoText'

const LatestThread = styled.div`
  box-sizing: border-box;
  display: block;
  justify-content: center;
  padding: 0.5em 1em;
  margin-right: 1em;
  width: 150px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  font-style: italic;
`

LatestThread.LatestLink = LatestLink
LatestThread.InfoText = InfoText

export default LatestThread

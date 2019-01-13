import styled from 'styled-components'
import { Link } from 'react-router-dom'

const LatestLink = styled(Link)`
  text-decoration: none;
  color: #00a8ff;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  white-space: nowrap;
  display: block;
  width: 250px;
  transition: 0.2s;
  font-size: 16px;

  &:hover {
    color: #0266c8;
    text-decoration: underline;
  }
`

export default LatestLink

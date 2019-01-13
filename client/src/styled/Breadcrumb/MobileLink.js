/* this has got to be the wrong way of doing this.. right? */
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const MobileLink = styled(Link)`
  font-family: 'Open Sans', sans-serif;
  font-weight: 300;
  text-decoration: none;
  margin: 0;
  color: white;
  font-size: 1em;
  display: inline;

  &:hover {
    text-decoration: underline;
  }

  @media screen and (min-width: 700px) {
    display: none;
  }
`

export default MobileLink

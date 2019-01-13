import styled from 'styled-components'
import { Link } from 'react-router-dom'

const CrumbLink = styled(Link)`
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

  @media screen and (max-width: 700px) {
    position: absolute !important;
    top: -9999px !important;
    left: -9999px !important;
  }
`

export default CrumbLink

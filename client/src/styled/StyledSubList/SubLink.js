import styled from 'styled-components'
import { Link } from 'react-router-dom'

const SubLink = styled(Link)`
  display: flex;
  text-decoration: none;
  color: #3d4852;
  padding: 0.5em 1em;
  width: 100%;
  font-size: 1.5em;
  justify-self: flex-start;
  align-self: center;
  font-family: 'Roboto', sans-serif;
  &:hover {
    color: #00a8ff;
  }

  @media screen and (max-width: 700px) {
    font-size: 20px;
  }
`

export default SubLink

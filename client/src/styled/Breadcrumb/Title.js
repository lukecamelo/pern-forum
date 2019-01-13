import styled from 'styled-components'
import { H1 } from '../index'

const Title = styled(H1)`
  color: white;
  margin: 0;
  @media screen and (max-width: 568px) {
    font-size: 1em;
  }

  @media screen and (max-width: 700px) {
    display: none !important;
  }
`

export default Title

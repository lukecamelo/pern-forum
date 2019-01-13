import styled from 'styled-components'

const Chevron = styled.i`
  margin: 0 6px;

  @media screen and (max-width: 700px) {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }
`

export default Chevron

import styled from 'styled-components'

const Author = styled.h2`
  color: ${props => props.theme.primary}
  font-size: 18px;
    > p {
      color: #555;
    }
    @media screen and (max-width: 532px) {
      margin-left: .5em;
    }
`

export default Author
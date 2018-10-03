import styled from 'styled-components'

const Author = styled.h2`
  color: ${props => props.theme.primary}
  font-family: "Roboto", sans-serif;
  font-size: 18px;
    > p {
      font-size: 14px;
      color: #0266c8;
    }
    @media screen and (max-width: 532px) {
      margin-left: .5em;
    }
`

export default Author
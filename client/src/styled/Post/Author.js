import styled from 'styled-components'

const Author = styled.div`
  color: ${props => props.theme.primary}
  font-family: "Roboto", sans-serif;
  margin: .5em 0;
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
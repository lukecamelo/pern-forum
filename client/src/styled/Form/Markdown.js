import styled from 'styled-components'

const Markdown = styled.div`
  background-color: white;
  margin: 0;
  padding: 0;
  transition: .4s;
  box-shadow: ${props => props.theme.mediumShadow};
  :focus-within {
    box-shadow: 0 0 0 white;
    transform: translateY(2px)
  }
`

export default Markdown
import styled from 'styled-components'

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #32343b;
  background-color: white;
  margin-bottom: 1em;
  border: 2px solid ${props => props.theme.primary};
  box-shadow: ${props => props.theme.mediumShadow}
`

export default Body
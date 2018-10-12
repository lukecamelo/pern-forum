import styled from 'styled-components'

const Header = styled.div`
  background-color: #0266c8;
  color: white;
  margin-top: 2em;
  margin-bottom: 0;
  padding: 1em;
  text-align: left;
  box-shadow: ${props => props.theme.mediumShadow};
`

export default Header
import styled from 'styled-components'

const Input = styled.input.attrs({
  type: 'text'
})`
  background: ${props => props.theme.primary};
  border: none;
  color: white;
  padding: 10px 1em;
  margin-bottom: 5px;
  width: 100%;
  font-size: 18px;

  &::placeholder {
    color: white;
  }
`

export default Input
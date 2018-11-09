import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  min-height: calc(100vh - 160px);
`
export const Input = styled.input.attrs({
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
    color: ${props => props.theme.secondary};
  }
`
export const Button = styled.button`
  display: inline-block;
  color: ${props => props.theme.primary};
  background-color: #fff;
  font-size: 1em;
  margin: 1em;
  padding: 0.5em 1.5em;
  border: 2px solid ${props => props.theme.primary};
  transition: 0.2s;
  box-shadow: ${props => props.theme.smallShadow};
  &:hover {
    box-shadow: none;
    transform: translateY(2px);
    background-color: ${props => props.theme.primary};
    color: #fff;
    cursor: pointer;
  }
`
export const StyledLink = styled(Link)`
  color: ${props => props.theme.primary};
  background-color: #fff;
  font-size: 1em;
  margin: 1em;
  text-decoration: none;
  padding: 0.5em 1.5em;
  border: 2px solid ${props => props.theme.primary};
  transition: 0.2s;
  &:hover {
    background-color: ${props => props.theme.primary};
    color: #fff;
    cursor: pointer;
  }
`
export const H1 = styled.h1`
  font-family: 'Open Sans', sans-serif;
  font-weight: 300;
  color: ${props => props.theme.primary};
`
export const SubforumLink = styled(Link)`
  font-family: 'Open Sans', sans-serif;
  font-weight: 300;
  text-decoration: none;
  color: white;
  font-size: 2em;
`
export const DeleteButton = styled(Button)`
  color: #bb0000;
  border: 2px solid #bb0000;
  &:hover {
    background-color: #bb0000
  }
`
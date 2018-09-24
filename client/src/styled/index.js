import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  text-align: center;
`
export const Input = styled.input.attrs({
  type: 'text'
})`
  background: ${props => props.theme.primary};
  border-radius: 3px;
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
export const Button = styled.button`
  color: ${props => props.theme.primary};
  background-color: #fff;
  font-size: 1em;
  margin: 1em;
  padding: 0.5em 1.5em;
  border-radius: 3px;
  border: 2px solid ${props => props.theme.primary};
  transition: 0.2s;
  &:hover {
    background-color: ${props => props.theme.primary};
    color: #fff;
    cursor: pointer;
  }
`
export const StyledLink = styled(Link)`
  color: #0266c8;
  background-color: white;
  text-decoration: none;
  margin-right: 1em;
  padding: 14px;
  transition: 0.2s;
  border-radius: 5px;
  border: 2px solid #0266c8;
  &:hover {
    color: white;
    background-color: #f195ac;
    border: 2px solid #f195ac;
    cursor: pointer;
  }
`
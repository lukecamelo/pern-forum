import React, { Component } from 'react'
import { userLogin, userLogout } from '../actions/authActions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import NavBar from './NavBar'

export const Container = styled.div`
  text-align: center;
`
export const FormWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  margin: 0 auto;
`
export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
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
export const H1 = styled.h1`
  color: ${props => props.theme.primary};
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

class Login extends Component {
  state = {
    usernameInput: '',
    passwordInput: ''
  }

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = async e => {
    e.preventDefault()

    try {
      await this.props.userLogin(
        this.state.usernameInput,
        this.state.passwordInput
      )
      this.props.history.push('/')
    } catch (e) {
      alert(e.message)
    }
  }

  render() {
    return (
      <Container>
        <NavBar />
        <H1>{this.props.auth.message}</H1>
        {this.props.auth.isLoggedIn ? (
          <H1>greetings, {this.props.auth.username}</H1>
        ) : (
          <H1>Please enter your username and password.</H1>
        )}

        {!this.props.auth.isLoggedIn ? (
          <FormWrapper>
            <Input
              name="usernameInput"
              type="text"
              value={this.state.usernameInput}
              onChange={this.changeHandler}
              placeholder="enter your username"
            />
            <Input
              name="passwordInput"
              type="password"
              value={this.state.passwordInput}
              onChange={this.changeHandler}
              placeholder="enter your password"
            />
            <ButtonWrapper>
              <Button onClick={e => this.handleSubmit(e)}>Login</Button>
            </ButtonWrapper>
          </FormWrapper>
        ) : null}
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { userLogin, userLogout }
)(Login)

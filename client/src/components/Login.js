import React, { Component } from 'react'
import { userLogin, userLogout } from '../actions/authActions'
import { connect } from 'react-redux'
import styled from 'styled-components'
import NavBar from './NavBar'

import { Container, Button, Input } from '../styled/index'

export const FormWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  margin: 0 auto;
`
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

export const H1 = styled.h1`
  color: ${props => props.theme.primary};
`

export class Login extends Component {
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
      this.props.history.push('/threads/1')
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
              data-testid="username-input"
            />
            <Input
              name="passwordInput"
              type="password"
              value={this.state.passwordInput}
              onChange={this.changeHandler}
              placeholder="enter your password"
              data-testid="password-input"
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

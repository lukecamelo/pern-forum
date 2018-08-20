import React, { Component } from 'react'
import { userLogin, userLogout } from '../actions/authActions'
import { connect } from 'react-redux'
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
  background: palevioletred;
  border-radius: 3px;
  border: none;
  color: white;
  padding: 10px 1em;
  margin-bottom: 5px;
  width: 100%;
  font-size: 18px;

  &::placeholder {
    color: papayawhip;
  }
`
export const Button = styled.button`
  color: ${props => props.theme.primary};
  background-color: #fff;
  font-size: 1em;
  margin: 1em;
  padding: 0.5em 1.5em;
  border-radius: 3px;
  border: 2px solid palevioletred;
  transition: 0.2s;
  &:hover {
    background-color: palevioletred;
    color: #fff;
    cursor: pointer;
  }
`
export const H1 = styled.h1`
  color: palevioletred;
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

  render() {
    return (
      <Container>
        <NavBar />
        {this.props.auth.isLoggedIn ? (
          <H1>greetings, {this.props.auth.username}</H1>
        ) : (
          <H1>Nobody logged in</H1>
        )}

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
            {!this.props.auth.isLoggedIn ? (
              <Button
                onClick={() =>
                  this.props.userLogin(
                    this.state.usernameInput,
                    this.state.passwordInput
                  )
                }
              >
                Login
              </Button>
            ) : (
              <Button onClick={this.props.userLogout}>Logout</Button>
            )}
          </ButtonWrapper>
        </FormWrapper>
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

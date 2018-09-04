import React from 'react'
import { FormWrapper, Button, Input, H1, Container } from './Login'
import { connect } from 'react-redux'
import { userSignup } from '../actions/authActions'
import NavBar from './NavBar'

class Signup extends React.Component {
  state = {
    usernameInput: '',
    passwordInput: '',
    avatarUrlInput: '',
    hasSignedUp: false
  }

  componentDidMount = () => {
    this.checkUrlExists('https://i.imgur.com/F6JK5tM.jpg').then(res =>
      console.log(res)
    )
  }

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  checkUrlExists = async testUrl => {
    const request = await fetch(testUrl, { mode: 'cors' })
    return request.status
  }

  render() {
    if (this.props.message !== 'User created!') {
      return (
        <Container>
          <NavBar />
          <H1>Enter a username and a password to register.</H1>
          <H1>{this.props.message}</H1>
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
            <Input
              name="avatarUrlInput"
              type="text"
              value={this.state.avatarUrlInput}
              onChange={this.changeHandler}
              placeholder="please enter imgur link for avatar"
            />
            <Button
              onClick={() =>
                this.props.userSignup(
                  this.state.usernameInput,
                  this.state.passwordInput,
                  this.state.avatarUrlInput
                )
              }
            >
              Signup
            </Button>
          </FormWrapper>
        </Container>
      )
    } else {
      return (
        <Container>
          <NavBar />
          <H1>{this.props.message}</H1>
        </Container>
      )
    }
  }
}

const mapStateToProps = state => ({
  message: state.auth.message,
  isLoggedIn: state.auth.isLoggedIn
})

export default connect(
  mapStateToProps,
  { userSignup }
)(Signup)

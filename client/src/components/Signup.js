import React from 'react'
import { connect } from 'react-redux'
import { userSignup } from '../actions/authActions'
import NavBar from './NavBar'
import axios from 'axios';

import { FormWrapper, H1 } from './Login'
import { Container, Input, Button } from '../styled/index'

export class Signup extends React.Component {
  state = {
    usernameInput: '',
    passwordInput: '',
    avatarUrlInput: '',
    urlIsValid: false,
    validationMessage: '',
    hasSignedUp: false
  }

  componentDidMount = () => {
    // this.checkUrlExists('https://i.imgur.com/F6JK5tM.jpg').then(res =>
    //   console.log(res)
    // )
  }

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  avatarChangeHandler = e => {
    this.setState({
      avatarUrlInput: e.target.value
    })
    this.checkUrlExists(this.state.avatarUrlInput).then(res => {
      if (res === 200) {
        this.setState({
          urlIsValid: true,
          validationMessage: 'that image exists :)'
        })
      } else {
        this.setState({
          urlIsValid: false,
          validationMessage: 'not a valid url :('
        })
      }
    })
  }

  async checkUrlExists (testUrl) {
    const request = await axios.get(testUrl, { mode: 'cors' })
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
              onChange={this.avatarChangeHandler}
              placeholder="please enter imgur link for avatar"
            />
            <H1>{this.state.validationMessage}</H1>
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

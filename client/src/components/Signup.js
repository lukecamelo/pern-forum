import React from 'react'
import { connect } from 'react-redux'
import { userSignup } from '../actions/authActions'
import NavBar from './NavBar'
import axios from 'axios'

import Form from '../styled/Form'
import { Container, Button, H1 } from '../styled/index'
import { Card } from './UserControlPanel'
import {
  FadeIn,
  SlideLeft,
  SlideRight,
  SlideBottom,
  SlideTop
} from '../styled/animations'

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
      console.log('interval check')
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

  async checkUrlExists(testUrl) {
    const request = await axios.get(testUrl, { mode: 'cors' })
    return request.status
  }

  render() {
    if (this.props.message !== 'User created!') {
      return (
        <Container>
          <NavBar />
          <FadeIn>
            <Card>
              <SlideTop>
                <H1>Enter a username and a password to register.</H1>
              </SlideTop>
              <Form>
                <SlideLeft>
                  <Form.Input
                    name="usernameInput"
                    type="text"
                    value={this.state.usernameInput}
                    onChange={this.changeHandler}
                    placeholder="enter your username"
                  />
                </SlideLeft>
                <SlideRight>
                  <Form.Input
                    name="passwordInput"
                    type="password"
                    value={this.state.passwordInput}
                    onChange={this.changeHandler}
                    placeholder="enter your password"
                  />
                </SlideRight>
                <SlideLeft>
                  <Form.Input
                    name="avatarUrlInput"
                    type="text"
                    value={this.state.avatarUrlInput}
                    onChange={this.avatarChangeHandler}
                    placeholder="imgur image link"
                  />
                </SlideLeft>
                <SlideBottom>
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
                </SlideBottom>
              </Form>
            </Card>
          </FadeIn>
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

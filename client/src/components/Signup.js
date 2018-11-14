import React from 'react'
import { connect } from 'react-redux'
import { userSignup } from '../actions/authActions'
import { Link } from 'react-router-dom'
import NavBar from './NavBar'
import { checkUrlExists } from '../utils/userHelpers'

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

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  avatarChangeHandler = async e => {
    await this.setState({
      avatarUrlInput: e.target.value
    })
    checkUrlExists(this.state.avatarUrlInput)
      .then(res => {
        if (res) {
          this.setState({
            urlIsValid: true,
            validationMessage: 'that image exists :)'
          })
        } else {
          this.setState({
            urlIsValid: false,
            validationMessage: 'not a valid avatar url :('
          })
        }
      })
      .catch(err => {
        console.log('error ', err)
        this.setState({
          urlIsValid: false,
          validationMessage: 'not a valid avatar url :('
        })
      })
  }

  handleSubmit = e => {
    e.preventDefault()
    try {
      this.props.userSignup(
        this.state.usernameInput,
        this.state.passwordInput,
        this.state.avatarUrlInput
      )
    } catch (e) {
      console.log('oops')
    }
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
              <Form style={{ width: 'auto' }}>
                <form onSubmit={this.handleSubmit}>
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
                    <p
                      style={
                        this.state.urlIsValid
                          ? {
                              paddingTop: '5px',
                              marginBottom: '0',
                              color: '#3c763d'
                            }
                          : {
                              paddingTop: '5px',
                              marginBottom: '0',
                              color: '#bb0000'
                            }
                      }
                    >
                      {this.state.validationMessage}
                    </p>
                    <Form.Input
                      name="avatarUrlInput"
                      type="text"
                      value={this.state.avatarUrlInput}
                      onChange={this.avatarChangeHandler}
                      placeholder="imgur image link"
                    />
                  </SlideLeft>
                  <SlideBottom>
                    <Button type="submit">Signup</Button>
                  </SlideBottom>
                </form>
              </Form>
            </Card>
          </FadeIn>
        </Container>
      )
    } else {
      return (
        <Container>
          <NavBar />
          <Card>
            <H1>{this.props.message}</H1>
            <p style={{ marginTop: 0 }}>Nice.. now to log in!</p>
            <div style={{ padding: '1.5em', textAlign: 'center' }}>
              <Link
                className="navlink"
                style={{ width: '200px', marginRight: 0 }}
                to="/login"
              >
                Log in
              </Link>
            </div>
          </Card>
        </Container>
      )
    }
  }
}

const mapStateToProps = ({auth: { message, isLoggedIn }}) => ({
  message,
  isLoggedIn
})

export default connect(
  mapStateToProps,
  { userSignup }
)(Signup)

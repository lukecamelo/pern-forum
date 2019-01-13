import React, { useState } from 'react'
import { userLogin, userLogout } from '../actions/authActions'
import { connect } from 'react-redux'
import styled from 'styled-components'
import NavBar from './NavBar'

import { Container, Button } from '../styled/index'
import { Card } from './UserControlPanel'
import Form from '../styled/Form'
import {
  FadeIn,
  SlideLeft,
  SlideRight,
  SlideBottom,
  SlideTop
} from '../styled/animations'

export const H1 = styled.h1`
  color: ${props => props.theme.primary};
`

function useUsername(initialValue) {
  const [username, setUsername] = useState(initialValue)
  function handleChange(e) {
    setUsername(e.target.value)
  }
  return {
    value: username,
    onChange: handleChange
  }
}

function usePassword(initialValue) {
  const [password, setPassword] = useState(initialValue)
  function handleChange(e) {
    setPassword(e.target.value)
  }
  return {
    value: password,
    onChange: handleChange
  }
}

export const Login = ({ userLogin, auth, ...props }) => {
  let usernameInput = useUsername('')
  let passwordInput = usePassword('')

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await userLogin(usernameInput.value, passwordInput.value)
      props.history.push('/subforums')
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <Container>
      <NavBar />
      <FadeIn>
        <Card>
          <SlideTop>
            <H1 style={{ padding: '0 1em' }}>
              Please enter your username and password.
            </H1>
          </SlideTop>

          {!auth.isLoggedIn ? (
            <Form style={{ width: 'auto' }}>
              <form onSubmit={handleSubmit}>
                <SlideLeft>
                  <Form.Input
                    name="usernameInput"
                    type="text"
                    {...usernameInput}
                    placeholder="enter your username"
                    data-testid="username-input"
                  />
                </SlideLeft>
                <SlideRight>
                  <Form.Input
                    name="passwordInput"
                    type="password"
                    {...passwordInput}
                    placeholder="enter your password"
                    data-testid="password-input"
                  />
                </SlideRight>
                <SlideBottom>
                  <Button
                    type="submit"
                    style={{ margin: '8px 16px 16px 16px' }}
                  >
                    Login
                  </Button>
                </SlideBottom>
              </form>
            </Form>
          ) : null}
        </Card>
      </FadeIn>
    </Container>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { userLogin, userLogout }
)(Login)

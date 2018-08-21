import React from 'react'
import { FormWrapper, Button, Input, H1 } from './Login'
import { connect } from 'react-redux'
import { userSignup } from '../actions/authActions'
import NavBar from './NavBar'

class Signup extends React.Component {
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
      <div>
        <NavBar />
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
          <Button
            onClick={() =>
              this.props.userSignup(
                this.state.usernameInput,
                this.state.passwordInput
              )
            }
          >
            Signup
          </Button>
        </FormWrapper>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  message: state.auth.message
})

export default connect(
  mapStateToProps,
  { userSignup }
)(Signup)
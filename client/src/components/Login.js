import React from 'react'
import { userLogin, userLogout } from '../actions/authActions'
import { connect } from 'react-redux'
import styled from 'styled-components'

const Login = (props) => {
  console.log(props)
  return (
    <div>
      <h1>greetings, {props.auth.username}</h1>
      <button onClick={props.userLogin}>Login</button>
      <button onClick={props.userLogout}>Logout</button>
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { userLogin, userLogout }
)(Login)

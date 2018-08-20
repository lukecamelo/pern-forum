import React from 'react'
import Login from '../components/Login'
import Signup from '../components/Signup'

import { connect } from 'react-redux'

const Auth = ({ isLoggedIn }) => {
  return <div>{isLoggedIn ? <Login /> : <Signup />}</div>
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn
})

export default connect(mapStateToProps)(Auth)

import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import './NavBar.css'
import { userLogout } from '../actions/authActions'

const StyledNav = styled.nav`
  display: flex;
  justify-content: flex-end;
  padding: 15px;
  background-color: ${props => props.theme.primary};
`

export const NavBar = ({ isLoggedIn, ...props }) => {
  if (isLoggedIn) {
    return (
      <StyledNav>
        <Link to="/" className="navlink">
          Home
        </Link>
        <a className="logout" onClick={() => props.userLogout()}>
          Logout
        </a>
      </StyledNav>
    )
  }
  return (
    <StyledNav>
      <Link to="/" className="navlink">
        Home
      </Link>

      <Link to="/login" className="navlink">
        Login
      </Link>

      <Link to="/signup" className="navlink">
        Signup
      </Link>
    </StyledNav>
  )
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn
})

export default connect(
  mapStateToProps,
  { userLogout }
)(NavBar)

import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { userLogout } from '../actions/authActions'

import './NavBar.css'

const StyledNav = styled.nav`
  display: flex;
  justify-content: flex-end;
  padding: 15px;
  background-color: ${props => props.theme.primary};
`
const Logo = styled.div`
  display: flex;
  margin-right: auto;
  align-self: center;
  margin-left: 1em;
  color: white;
  font-size: 1.5rem;
  font-family: "Lato", sans-serif;

    @media screen and (max-width: 600px) {
      display: none;
    }
`

export const NavBar = ({ isLoggedIn, user, ...props }) => {
  if (isLoggedIn) {
    return (
      <StyledNav>
        <Logo>imp.zone</Logo>
        <Link to="/threads/1" className="navlink">
          Home
        </Link>
        <Link to="/usercontrolpanel" className="navlink">
          Control Panel
        </Link>
        <a className="logout" onClick={() => props.userLogout()}>
          Logout ({user})
        </a>
      </StyledNav>
    )
  }
  return (
    <StyledNav>
      <Link to="/threads/1" className="navlink">
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
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.username
})

export default connect(
  mapStateToProps,
  { userLogout }
)(NavBar)

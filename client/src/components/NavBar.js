import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { userLogout } from '../actions/authActions'

import ResponsiveMenu from 'react-responsive-navbar'
import '../css/NavBar.css'

const StyledNav = styled.nav`
  display: flex;
  justify-content: flex-end;
  padding: 15px;
  background-color: ${props => props.theme.primary};
  @media screen and (max-width: 700px) {
    flex-direction: column;
    align-items: center;
  }
`
const Logo = styled.a`
  display: flex;
  margin-right: auto;
  align-self: center;
  margin-left: 1em;
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-family: 'Lato', sans-serif;

  @media screen and (max-width: 701px) {
    display: none;
  }
`
export const NavBar = ({ isLoggedIn, user, isHome, ...props }) => {
  let navigation
  if (isLoggedIn) {
    navigation = (
      <StyledNav>
        <Logo href="/subforums">[forum]</Logo>
        <Link to="/subforums" className="navlink">
          Home
        </Link>
        <Link to="/usercontrolpanel" className="navlink">
          Control Panel
        </Link>
        <Link
          to="/subforums"
          className="logout"
          onClick={() => props.userLogout()}
        >
          Logout ({user})
        </Link>
      </StyledNav>
    )
    return (
      <ResponsiveMenu
        menuOpenButton={<i className="fas fa-bars fa-3x" />}
        menuCloseButton={<i className="fas fa-times-circle" />}
        changeMenuOn="700px"
        menu={navigation}
        largeMenuClassName="large-menu"
        smallMenuClassName="small-menu"
      />
    )
  } else {
    navigation = (
      <StyledNav>
        <Logo>[forum]</Logo>
        <Link to="/subforums" className="navlink">
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
    return (
      <ResponsiveMenu
        menuOpenButton={<i className="fas fa-bars fa-3x" />}
        menuCloseButton={<i className="fas fa-times-circle" />}
        changeMenuOn="700px"
        menu={navigation}
        largeMenuClassName="large-menu"
        smallMenuClassName="small-menu"
      />
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.username
})

export default connect(
  mapStateToProps,
  { userLogout }
)(NavBar)

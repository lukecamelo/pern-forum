import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { userLogout } from '../actions/authActions'
import { fetchThreads } from '../actions/threadActions'

import ResponsiveMenu from 'react-responsive-navbar'
import './NavBar.css'

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
const Logo = styled.div`
  display: flex;
  margin-right: auto;
  align-self: center;
  margin-left: 1em;
  color: white;
  font-size: 1.5rem;
  font-family: 'Lato', sans-serif;

  @media screen and (max-width: 701px) {
    display: none;
  }
`
const A = styled.a`
  color: white;
  background-color: #0266c8;
  text-decoration: none;
  margin-right: 1em;
  padding: 14px;
  transition: 0.2s;
  font-family: 'Lato', sans-serif;
  &:hover {
    color: white;
  background-color: #f195ac;
  cursor: pointer;
  }
`
export const NavBar = ({ isLoggedIn, user, isHome, ...props }) => {
  let navigation
  if (isLoggedIn) {
    navigation = (
      <StyledNav>
        <Logo>imp.zone</Logo>
        {!isHome ? (
          <Link to="/threads/1" className="navlink">
            Home
          </Link>
        ) : (
          <A className="navlink" onClick={() => props.fetchThreads()}>Home</A>
        )}
        <Link to="/usercontrolpanel" className="navlink">
          Control Panel
        </Link>
        <Link
          to="/threads/1"
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
        <Logo>imp.zone</Logo>
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
  { userLogout, fetchThreads }
)(NavBar)

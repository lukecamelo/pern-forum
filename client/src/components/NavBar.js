import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import './NavBar.css'

const StyledNav = styled.nav`
  display: flex;
  justify-content: flex-end;
  padding: 15px;
  background-color: #e5d7bf;
`

const NavBar = () => {
  return(
    <StyledNav>
      <Link to='/' className='link'>Home</Link>
      <Link to='/login' className='link'>Login</Link>
      <Link to='/signup' className='link'>Signup</Link>
    </StyledNav>
  )
}

export default NavBar
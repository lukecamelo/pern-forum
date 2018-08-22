import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import NavBar from '../components/NavBar'
import { H1 } from '../components/Login'
import ThreadList from './ThreadList';

const Wrapper = styled.div`
  text-align: center;
`

class App extends Component {
  render() {
    return (
      <Wrapper>
        <NavBar />
        {this.props.isLoggedIn ? (
          <ThreadList />
        ) : (
          <H1>Please log in to view threads.</H1>
        )}
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn
})

export default connect(mapStateToProps)(App)

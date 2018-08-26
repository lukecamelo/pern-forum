import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { fetchData, fetchThreads } from '../actions/threadActions'
import { Link } from 'react-router-dom'

import NavBar from '../components/NavBar'
import { H1 } from '../components/Login'
import ThreadList from './ThreadList'
import Pagination from '../components/Pagination'

const Wrapper = styled.div`
  text-align: center;
`

class App extends Component {
  componentDidMount() {
    this.props.fetchData()
    this.props.fetchThreads()
  }

  render() {
    if (this.props.isLoggedIn && this.props.threads.length) {
      return (
        <Wrapper>
          <NavBar/>
          <Pagination data={this.props.threads}>
            <ThreadList />
          </Pagination>
          <Link className="thread-button" to="/newthread">
            Post Thread
          </Link>
        </Wrapper>
      )
    } else {
      return (
        <Wrapper>
          <NavBar />
          <H1>Please log in to view threads.</H1>
        </Wrapper>
      )
    }
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  threads: state.threadData.threads
})

export default connect(
  mapStateToProps,
  { fetchData, fetchThreads }
)(App)

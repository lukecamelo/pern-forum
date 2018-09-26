import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchData, fetchThreads } from '../actions/threadActions'
import { checkUserLoggedIn } from '../actions/authActions'
import { Link } from 'react-router-dom'

import { H1 } from '../components/Login'
import { Container } from '../styled/index'
import NavBar from '../components/NavBar'
import ThreadList from './ThreadList'
import Pagination from '../components/Pagination'

export class App extends Component {
  componentDidMount() {
    this.props.fetchData()
    this.props.fetchThreads()
  }

  render() {
    if (this.props.isLoggedIn && this.props.threads.length) {
      return (
        <Container>
          <NavBar />
          <Pagination
            data={this.props.threads}
            currentPage={this.props.match.params.page}
            context='threads'
          >
            {data => <ThreadList data={data} />}
          </Pagination>
          <Link className="thread-button" to="/newthread">
            Post Thread
          </Link>
        </Container>
      )
    } else {
      return (
        <Container>
          <NavBar />
          <H1>Please log in to view threads.</H1>
        </Container>
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
  { fetchData, fetchThreads, checkUserLoggedIn }
)(App)

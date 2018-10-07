import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchData, fetchThreads } from '../actions/threadActions'
import { checkUserLoggedIn } from '../actions/authActions'
import { Link } from 'react-router-dom'

import { H1 } from '../components/Login'
import { Card } from '../components/UserControlPanel'
import { Container } from '../styled/index'
import { FadeIn, SlideTop, SlideLeft } from '../styled/animations'
import NavBar from '../components/NavBar'
import ThreadList from './ThreadList'
import Pagination from '../components/Pagination'
import styled from 'styled-components'

const NewThreadLink = styled(Link)`
  color: #0266c8;
  background-color: white;
  text-decoration: none;
  padding: 14px;
  transition: 0.2s;
  border: 2px solid #0266c8;
  font-family: 'Roboto', sans-serif;
  &:hover {
    background-color: #0266c8;
    color: white;
  }
`

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
          <FadeIn>
            <SlideTop>
              <H1>General Discussion</H1>
            </SlideTop>
            <SlideLeft>
              <Pagination
                data={this.props.threads}
                currentPage={this.props.match.params.page}
                context="threads"
              >
                {data => <ThreadList data={data} />}
              </Pagination>
            </SlideLeft>
            <div style={{ margin: '1em 0 2em 0' }}>
              <NewThreadLink to="/newthread">Post Thread</NewThreadLink>
            </div>
          </FadeIn>
        </Container>
      )
    } else if (!this.props.isLoggedIn && this.props.threads.length) {
      return (
        <Container>
          <NavBar />
          <FadeIn>
            <Card>
              <SlideTop>
                <H1>Please log in to view threads.</H1>
              </SlideTop>
            </Card>
          </FadeIn>
        </Container>
      )
    } else if (this.props.isLoggedIn && !this.props.threads.length) {
      return (
        <Container>
          <NavBar />
          <Card>
            <div style={{ padding: '1em' }}>
              <H1>There's nothing here. Make the first thread!</H1>
              <div style={{ padding: '1em' }}>
                <NewThreadLink to="/newthread">Post Thread</NewThreadLink>
              </div>
            </div>
          </Card>
        </Container>
      )
    } else {
      return (
        <Container>
          <NavBar />
          <Card>
            <H1>Ah.. a fresh start. Log in and make the first thread!</H1>
          </Card>
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

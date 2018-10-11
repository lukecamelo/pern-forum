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
import Loader from '../components/Loader';

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
  state = {
    hasLoaded: false
  }
  
  async componentDidMount() {
    await this.props.fetchData()
    await this.props.fetchThreads()
    this.setState({
      hasLoaded: true
    })
  }

  render() {
    if (this.props.isLoggedIn && this.state.hasLoaded) {
      return (
        <Container>
          <NavBar />
          <FadeIn>
            <SlideTop style={{ textAlign: 'center' }}>
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
            <div style={{ margin: '1em 0 2em 0', textAlign: 'center' }}>
              <NewThreadLink to="/newthread">Post Thread</NewThreadLink>
            </div>
          </FadeIn>
        </Container>
      )
    } else if (!this.props.isLoggedIn && this.state.hasLoaded) {
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
    } else if (this.props.isLoggedIn && !this.state.hasLoaded) {
      return (
        <Container>
          <NavBar />
          <Loader />
        </Container>
      )
    } else {
      return (
        <Container>
          <NavBar />
          <Loader />
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

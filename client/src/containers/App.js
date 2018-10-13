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
import Loader from '../components/Loader'
import Footer from '../components/Footer'
import styled from 'styled-components'

export const NewThreadLink = styled(Link)`
  color: #0266c8;
  background-color: white;
  text-decoration: none;
  padding: 14px;
  transition: 0.2s;
  border: 2px solid #0266c8;
  font-family: 'Roboto', sans-serif;
  box-shadow: ${props => props.theme.smallShadow};
  &:hover {
    box-shadow: none;
    transform: translateY(2px);
    background-color: #0266c8;
    color: white;
  }
`
export const Banner = styled.div`
  width: 75%;
  margin: 0 auto;
  background-color: #0266c8;
  color: white;
  margin: 2em auto 0 auto;
  padding: 1em 0 1em 1em;
  box-shadow: ${props => props.theme.largeShadow};
  @media screen and (max-width: 700px) {
    width: 90%;
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
            <SlideTop>
              <Banner>
                <H1 style={{ margin: '0 auto', color: 'white' }}>General Discussion</H1>
              </Banner>
            </SlideTop>
            <SlideLeft>
              <Pagination
                data={this.props.threads}
                currentPage={this.props.match.params.page}
                context="threads"
                pageSize={15}
              >
                {data => <ThreadList data={data} />}
              </Pagination>
            </SlideLeft>
          </FadeIn>
          <Footer />
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
          <Footer />
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

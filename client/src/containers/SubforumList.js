import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { getLatestSubforumThread } from '../utils/threadHelpers'

import { Banner } from './App'
import { H1, Container } from '../styled'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import '../css/SubforumList.css'
import { ThreadLink } from './ThreadList'

const SubforumContainer = styled.div`
  width: 75vw;
  // padding: 0 1em 1em 1em;
  margin: 0 auto 2em auto;
  background-color: white;
  box-shadow: ${props => props.theme.mediumShadow};
`
const LatestThread = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  white-space: nowrap;
  display: block;
  width: 250px;
`

class SubforumList extends Component {
  state = {
    latestGeneral: '',
    latestGames: '',
    dumpy: 'fuck'
  }

  componentDidMount = async () => {
    let latestGeneral = await getLatestSubforumThread(1)
    let latestGames = await getLatestSubforumThread(2)
    this.setState({
      latestGeneral,
      latestGames
    })
  }

  render() {
    return (
      <React.Fragment>
        <Container>
          <NavBar />
          <Banner>
            <H1 style={{ margin: '0 auto', color: 'white' }}>Forums</H1>
          </Banner>
          <SubforumContainer>
            <ThreadLink style={{ fontSize: '1.5em' }}>
              <div className="title-pages">
                <Link className="title" to="/subforum/1/page/1">
                  General Discussion
                </Link>
              </div>

              <div className="author" style={{ justifyContent: 'center' }}>
                <div className="item thread-author">
                  <p className="tag">Latest Thread</p>
                  <LatestThread>{this.state.latestGeneral}</LatestThread>
                </div>
              </div>
            </ThreadLink>
            <ThreadLink style={{ fontSize: '1.5em' }}>
              <div className="title-pages">
                <Link className="title" to="/subforum/2/page/1">
                  Video Games
                </Link>
              </div>
              <div className="author" style={{ justifyContent: 'center' }}>
                <div className="item thread-author">
                  <p className="tag">Latest Thread</p>
                  <LatestThread>{this.state.latestGames}</LatestThread>
                </div>
              </div>
            </ThreadLink>
          </SubforumContainer>
        </Container>
        <Footer />
      </React.Fragment>
    )
  }
}

export default SubforumList

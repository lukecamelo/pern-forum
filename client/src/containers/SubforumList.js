import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import api from '../services/api'
import moment from 'moment'

import { Banner } from './App'
import { H1 } from '../styled'
import '../css/SubforumList.css'
import { ThreadLink } from './ThreadList'
import Loader from '../components/Loader'

const SubforumContainer = styled.div`
  width: 75vw;
  margin: 0 auto 2em auto;
  background-color: white;
  box-shadow: ${({ theme }) => theme.mediumShadow};
  @media screen and (max-width: 700px) {
    width: 90vw;
  }
`
const LatestThread = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.primary};
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  white-space: nowrap;
  display: block;
  width: 250px;
  transition: 0.2s;
  &:hover {
    color: ${({ theme }) => theme.secondary};
    text-decoration: underline;
  }
`
const InfoText = styled.p`
  margin: 0;
  color: rgb(61, 72, 82);
  font-size: 18px;
`
/*
 ************* 
 This whole component is a big mess
 TODO: fix the mess
 ************* 
*/

class SubforumList extends Component {
  state = {
    latestGeneral: '...',
    latestGames: '...',
    hasLoaded: false
  }

  componentDidMount = async () => {
    let latestGeneral = await api.threads.getLatestSubforumThread(1)
    let latestGames = await api.threads.getLatestSubforumThread(2)
    this.setState({
      latestGeneral,
      latestGames,
      hasLoaded: true
    })
  }

  render() {
    const { hasLoaded, latestGeneral, latestGames } = this.state
    if (hasLoaded) {
      return (
        <React.Fragment>
          <Banner>
            <H1 style={{ margin: '0 auto', color: 'white' }}>Forums</H1>
          </Banner>
          <SubforumContainer
            className="subforums"
            style={{ overflow: 'hidden' }}
          >
            <ThreadLink style={{ fontSize: '1.5em' }}>
              <div className="title-pages">
                <Link className="title" to="/subforum/1/page/1">
                  General Discussion
                </Link>
              </div>

              <div
                className="latest-thread"
                style={{
                  justifyContent: 'center',
                  padding: '0.5em 1em',
                  width: '200px',
                  textOverflow: 'ellipsis'
                }}
              >
                <div
                  className="item thread-author"
                  style={{ textAlign: 'left' }}
                >
                  <LatestThread
                    to={`/thread/${this.state.latestGeneral.id}/page/1`}
                  >
                    {latestGeneral.title}
                  </LatestThread>
                  <InfoText>By {latestGeneral.Post[0].author}</InfoText>
                  <InfoText>
                    {moment(latestGeneral.Post[0].createdAt).fromNow()}
                  </InfoText>
                </div>
              </div>
            </ThreadLink>

            <ThreadLink style={{ fontSize: '1.5em' }}>
              <div className="title-pages">
                <Link className="title" to="/subforum/2/page/1">
                  Video Games
                </Link>
              </div>
              <div
                className="latest-thread"
                style={{
                  justifyContent: 'center',
                  padding: '0.5em 1em',
                  width: '200px',
                  textOverflow: 'ellipsis'
                }}
              >
                <div
                  className="item thread-author"
                  style={{ textAlign: 'left' }}
                >
                  <LatestThread
                    to={`/thread/${this.state.latestGames.id}/page/1`}
                  >
                    {latestGames.title}
                  </LatestThread>
                  <InfoText>By {latestGames.Post[0].author}</InfoText>
                  <InfoText>
                    {moment(latestGames.Post[0].createdAt).fromNow()}
                  </InfoText>
                </div>
              </div>
            </ThreadLink>
          </SubforumContainer>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <Loader />
        </React.Fragment>
      )
    }
  }
}

export default SubforumList

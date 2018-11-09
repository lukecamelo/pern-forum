import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { getLatestSubforumThread } from '../utils/threadHelpers'

import { Banner } from './App'
import { H1 } from '../styled'
import '../css/SubforumList.css'
import { ThreadLink } from './ThreadList'

const SubforumContainer = styled.div`
  width: 75vw;
  // padding: 0 1em 1em 1em;
  margin: 0 auto 2em auto;
  background-color: white;
  box-shadow: ${({ theme }) => theme.mediumShadow};
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

class SubforumList extends Component {
  state = {
    latestGeneral: 'asdkfjalskdjflka',
    latestGames: 'lkajsfdlkjaslkfj',
    hasLoaded: false
  }

  componentDidMount = async () => {
    let latestGeneral = await getLatestSubforumThread(1)
    let latestGames = await getLatestSubforumThread(2)
    this.setState({
      latestGeneral,
      latestGames,
      hasLoaded: true
    })
  }

  render() {
    const { hasLoaded, latestGeneral, latestGames } = this.state
    return (
      <React.Fragment>
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
                <LatestThread
                  to={`/thread/${this.state.latestGeneral.id}/page/1`}
                >
                  {hasLoaded ? latestGeneral.title : 'loading...'}
                </LatestThread>
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
                <LatestThread
                  to={`/thread/${this.state.latestGames.id}/page/1`}
                >
                  {hasLoaded ? latestGames.title : 'loading...'}
                </LatestThread>
              </div>
            </div>
          </ThreadLink>
        </SubforumContainer>
      </React.Fragment>
    )
  }
}

export default SubforumList

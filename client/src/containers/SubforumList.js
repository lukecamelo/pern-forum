import React, { Component } from 'react'

import api from '../services/api'
import moment from 'moment'

import { Banner } from './App'
import { H1 } from '../styled'
import '../css/SubforumList.css'
import StyledSubList from '../styled/StyledSubList'
import LatestThread from '../styled/StyledSubList/LatestThread'
import Loader from '../components/Loader'

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
          <StyledSubList>
            <StyledSubList.SubContainer>
              <StyledSubList.LinkContainer>
                <StyledSubList.SubLink to="/subforum/1/page/1">
                  General Discussion
                </StyledSubList.SubLink>
              </StyledSubList.LinkContainer>

              <LatestThread style={{ textAlign: 'left' }}>
                <LatestThread.LatestLink
                  to={`/thread/${this.state.latestGeneral.id}/page/1`}
                >
                  {latestGeneral.title}
                </LatestThread.LatestLink>

                <LatestThread.InfoText>
                  By {latestGeneral.Post[0].author}
                </LatestThread.InfoText>
                <LatestThread.InfoText>
                  {moment(latestGeneral.Post[0].createdAt).fromNow()}
                </LatestThread.InfoText>
              </LatestThread>
            </StyledSubList.SubContainer>

            <StyledSubList.SubContainer>
              <StyledSubList.LinkContainer>
                <StyledSubList.SubLink to="/subforum/2/page/1">
                  Video Games
                </StyledSubList.SubLink>
              </StyledSubList.LinkContainer>
              <LatestThread>
                <LatestThread.LatestLink
                  to={`/thread/${this.state.latestGames.id}/page/1`}
                >
                  {latestGames.title}
                </LatestThread.LatestLink>
                <LatestThread.InfoText>
                  By {latestGames.Post[0].author}
                </LatestThread.InfoText>
                <LatestThread.InfoText>
                  {moment(latestGames.Post[0].createdAt).fromNow()}
                </LatestThread.InfoText>
              </LatestThread>
            </StyledSubList.SubContainer>
          </StyledSubList>
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

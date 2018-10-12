import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchData, fetchThreads } from '../actions/threadActions'
import { filterAuthor } from '../utils/threadHelpers'
import Loader from '../components/Loader'
import styled from 'styled-components'
import './ThreadList.css'

import { Container } from '../styled/index'

export const ListWrapper = styled.main`
  // background-color: #f4f4f4;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 75%;
  height: 100%;
  margin: 0 auto;
  box-shadow: ${props => props.theme.largeShadow};
  @media screen and (max-width: 700px) {
    width: 90%;
  }
`
const ThreadLink = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-grow: 1;
  width: 100%;
  border-bottom: solid 1px hsla(270, 7%, 92%, 1);
`

export class ThreadList extends Component {
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
    const { data: threads, users } = this.props
    if (this.state.hasLoaded) {
      // TODO: load page numbers for individual threads.. a large undertaking
      const threadLinks = threads.map(thread => {
        return (
          <ThreadLink key={thread.id}>
            <Link className="title" to={`/thread/${thread.id}/page/1`}>
              {thread.title}
            </Link>
            <div className="author">
              <div className="item thread-author">
                <p>Author</p>
                {filterAuthor(users, thread.userId)}
              </div>

              <div className="item">
                <p>Posts</p>
                {thread.Post.length}
              </div>

              <div className="item">
                <p>Latest</p>
                {thread.Post[0].author}
              </div>
            </div>
          </ThreadLink>
        )
      })
      return (
        <Container>
          <ListWrapper>{threadLinks}</ListWrapper>
        </Container>
      )
    } else {
      return <Loader />
    }
  }
}

const mapStateToProps = state => ({
  users: state.threadData.users
})

export default connect(
  mapStateToProps,
  { fetchData, fetchThreads }
)(ThreadList)

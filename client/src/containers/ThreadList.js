import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchData, fetchThreads } from '../actions/threadActions'
import { filterAuthor, checkForPosts } from '../utils/threadHelpers'
import styled from 'styled-components'
import './ThreadList.css'

import { Container } from '../styled/index'

export const ListWrapper = styled.main`
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 75%;
  margin: 0 auto;
  box-shadow: ${props => props.theme.largeShadow}
`
const ThreadLink = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid #2e262e;
`

export class ThreadList extends Component {
  componentDidMount() {
    this.props.fetchData()
    this.props.fetchThreads()
  }

  render() {
    const { data: threads, users } = this.props
    if (threads.length && users.length && checkForPosts(threads)) {
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
                {filterAuthor(this.props.users, thread.userId)}
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
      return <h1 id="loading-header">Loading threads...</h1>
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

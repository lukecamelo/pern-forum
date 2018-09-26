import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchData, fetchThreads } from '../actions/threadActions'
import { filterAuthor } from '../utils/threadHelpers'
import styled from 'styled-components'
import './ThreadList.css'

import { Container } from '../styled/index'

export const ListWrapper = styled.main`
  background-color: #f4afc2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 75%;
  margin: 0 auto;
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

  // most likely extremely naïve and inefficient 
  checkForPosts = () => {
    const { data: threads } = this.props
    let increment = 0
    threads.forEach(thread => {
      if (thread.Post.length > 0) {
        increment++
      }
    })
    if (increment === threads.length) {
      return true
    }
    return false
  }

  render() {
    const { data: threads, users } = this.props
    if (threads.length && users.length && this.checkForPosts()) {
      const threadLinks = threads.map(thread => {
        return (
          <ThreadLink key={thread.id}>
            <Link className="title" to={`/thread/${thread.id}`}>
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
                <p>Killed by</p>
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

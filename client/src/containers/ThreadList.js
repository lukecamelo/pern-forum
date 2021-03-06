import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchData, fetchSubforumThreads } from '../actions/threadActions'
import { filterAuthor, checkForPosts } from '../utils/threadHelpers'
import Loader from '../components/Loader'
import styled from 'styled-components'
import '../css/ThreadList.css'

export const ListWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 75%;
  margin: 0 auto;
  box-shadow: ${({ theme }) => theme.largeShadow};
  @media screen and (max-width: 700px) {
    width: 90%;
  }
`
export const ThreadLink = styled.div`
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-grow: 1;
  width: 100%;
  border-bottom: solid 1px hsla(270, 7%, 92%, 1);
  transition: 0.2s;
`

export class ThreadList extends Component {
  state = {
    hasLoaded: false
  }

  async componentDidMount() {
    await this.props.fetchData()
    await this.props.fetchSubforumThreads(this.props.subforumId)
    this.setState({
      hasLoaded: true
    })
  }

  // Displays page links if thread has more than 1 page
  // very similar to the method used in Pagination for
  // rendering page numbers/links.

  // TODO: write a version of this method that can be used in both cases
  showPageNumbers = thread => {
    let pageCount = parseInt(thread.Post.length / 10, 10)
    if (thread.Post.length % 10 > 0) {
      pageCount++
    }
    let controls = []
    for (let i = 1; i <= pageCount; i++) {
      controls.push(
        <Link
          to={`/thread/${thread.id}/page/${i}`}
          key={i}
          className="page-button"
        >
          {i}
        </Link>
      )
    }
    return controls
  }

  render() {
    const { data: threads, users } = this.props
    if (this.state.hasLoaded && checkForPosts(threads)) {
      const threadLinks = threads.map(thread => {
        return (
          <ThreadLink key={thread.id}>
            <div className="title-pages">
              <Link className="title" to={`/thread/${thread.id}/page/1`}>
                {thread.title}
              </Link>
              <div className="page-controls">
                {thread.Post.length > 10 ? this.showPageNumbers(thread) : null}
              </div>
            </div>
            <div className="author">
              <div className="item thread-author">
                <p className="tag">Author</p>
                <p className="username">{filterAuthor(users, thread.userId)}</p>
              </div>

              <div className="item">
                <p className="tag">Posts</p>
                {thread.Post.length}
              </div>

              <div className="item">
                <p className="tag">Latest</p>
                <p className="username">{thread.Post[0].author}</p>
              </div>
            </div>
          </ThreadLink>
        )
      })
      return (
        <React.Fragment>
          <ListWrapper>{threadLinks}</ListWrapper>
        </React.Fragment>
      )
    } else {
      return <Loader />
    }
  }
}

const mapStateToProps = ({ threadData: { users } }) => ({
  users
})

export default connect(
  mapStateToProps,
  { fetchData, fetchSubforumThreads }
)(ThreadList)

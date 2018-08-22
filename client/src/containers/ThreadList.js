import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchThreads, fetchData } from '../actions/threadActions'
import styled from 'styled-components'
import './ThreadList.css'

const ListWrapper = styled.main`
  background-color: #f4afc2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 75%;
  margin: 0 auto;
`

class ThreadList extends Component {
  componentDidMount = () => {
    this.props.fetchThreads()
    this.props.fetchData()
  }

  fetchThreadAuthor = userId => {
    return this.props.users.find(user => user.id === userId).username
  }

  render() {
    if (this.props.threads.length && this.props.users.length) {
      const threadLinks = this.props.threads.map(thread => {
        return (
          <Link className='link' key={thread.id} to={`/thread/${thread.id}`}>
            {thread.title} - <strong>{this.fetchThreadAuthor(thread.userId)}</strong>
          </Link>
        )
      })
      return <ListWrapper>{threadLinks}</ListWrapper>
    } else {
      return <h1>Loading threads...</h1>
    }
  }
}

const mapStateToProps = state => ({
  threads: state.threadData.threads,
  users: state.threadData.users
})

export default connect(
  mapStateToProps,
  { fetchThreads, fetchData }
)(ThreadList)

/* ------- STUFF WE DON'T NEED RIGHT NOW ------- */
// const threads = this.props.threads.map(thread => {
//   return (
//     <Thread
//       key={thread.id}
//       creatorId={this.fetchThreadAuthor(thread.userId)[0].username}
//       title={thread.title}
//       content={thread.content}
//     />
//   )
// })

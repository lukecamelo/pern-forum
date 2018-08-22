import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchThreads, fetchData } from '../actions/threadActions'
import Thread from './Thread'
import styled from 'styled-components'

class ThreadList extends Component {
  componentDidMount = () => {
    this.props.fetchThreads()
    this.props.fetchData()
  }

  fetchThreadAuthor = userId => {
    return this.props.users.filter(user => user.id === userId)
  }

  render() {
    if (this.props.threads.length && this.props.users.length) {
      const threadLinks = this.props.threads.map(thread => {
        return (
          <Link key={thread.id} to={`/thread/${thread.id}`}>{thread.title}</Link>
        )
      })
      return (
        <div>{threadLinks}</div>  
      )
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
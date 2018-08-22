import React, { Component } from 'react'
import { connect } from 'react-redux'
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
      const threads = this.props.threads.map(thread => {
        return (
          <Thread
            key={thread.id}
            creatorId={this.fetchThreadAuthor(thread.userId)[0].username}
            title={thread.title}
            content={thread.content}
          />
        )
      })
      return <div>{threads}</div>
    } else {
      return <h1>Loading threads...</h1>
    }
  }
}

const mapStateToProps = state => ({
  threads: state.threadData.threads,
  users: state.threadData.data
})

export default connect(
  mapStateToProps,
  { fetchThreads, fetchData }
)(ThreadList)

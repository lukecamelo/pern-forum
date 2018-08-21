import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchThreads, fetchData } from '../actions/threadActions'

import styled from 'styled-components'

const ThreadWrapper = styled.section`
  background-color: #dff4ff;
  color: #564154;
  padding: 2em;
`
const StyledThread = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #32343b;
  background-color: white;
  border: 2px solid ${props => props.theme.primary};
`
const ThreadHeader = styled.h2`
  margin-left: 1em;
  border-bottom: 2px solid ${props => props.theme.secondary}
  text-align: left;
`
const ThreadContent = styled.p`
  padding-left: 10px;
  padding-right: 10px;
`

class Thread extends Component {
  componentDidMount = () => {
    this.props.fetchThreads()
    this.props.fetchData()
  }

  setThreadAuthor = userId => {
    return this.props.data.filter(user => user.id === userId)
  }

  render() {
    if (this.props.threads.length && this.props.data.length ) {
       
      let posts = this.props.threads.map(thread => {
        return (
          <StyledThread key={thread.id}>
            <ThreadHeader>
              {thread.title}, posted by {this.setThreadAuthor(thread.userId)[0].username}
            </ThreadHeader>
            <ThreadContent>{thread.content}</ThreadContent>
          </StyledThread>
        )
      })
      return (
        <div>
          <ThreadWrapper>{posts}</ThreadWrapper>
        </div>
      )
    } else {
      return <div>loading.</div>
    }
  }
}

const mapStateToProps = state => ({
  threads: state.threadData.threads,
  data: state.threadData.data
})

export default connect(
  mapStateToProps,
  { fetchThreads, fetchData }
)(Thread)

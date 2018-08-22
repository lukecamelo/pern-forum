import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchThreads, fetchData, fetch } from '../actions/threadActions'

import styled from 'styled-components'
import NavBar from '../components/NavBar'

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
    const {
      match: { params }
    } = this.props
    this.props.fetchThreads()
    this.props.fetchData()
    console.log(this.props.threads)
  }

  render() {
    if (this.props.threads.length && this.props.users.length) {
      const thread = this.props.threads.find(
        thread => thread.id == this.props.match.params.id
      )
      const author = this.props.users.find(user => user.id == thread.userId)
      return (
        <div>
          <NavBar />
          <ThreadWrapper>
            <StyledThread>
              <ThreadHeader>
                {thread.title}, posted by {author.username}
              </ThreadHeader>
              <ThreadContent>{thread.content}</ThreadContent>
            </StyledThread>
          </ThreadWrapper>
        </div>
      )
    } else {
      return <h1>hi</h1>
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
)(Thread)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchThreads } from '../actions/testActions'

import styled from 'styled-components'

const ThreadWrapper = styled.section`
  background-color: #779fa1;
  color: #564154;
  padding: 2em;
`

const StyledThread = styled.div`
  color: palevioletred;
  background-color: papayawhip;
`

class Thread extends Component {
  componentDidMount = () => {
    this.props.fetchThreads()
  }

  render() {
    console.log(this.props.threads)
    let posts = this.props.threads.map(thread => {
      return (
        <StyledThread key={thread.id}>
          <h2>{thread.title}</h2>
          <p>{thread.content}</p>
        </StyledThread>
      )
    })
    return (
      <div>
        <ThreadWrapper>{posts}</ThreadWrapper>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  threads: state.test.threads
})

export default connect(
  mapStateToProps,
  { fetchThreads }
)(Thread)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchThreads, fetchData } from '../actions/threadActions'

import styled from 'styled-components'
import { H1 } from '../components/Login'

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

const Thread = ({ title, creatorId, content }) => {
  return (
    <ThreadWrapper>
      <StyledThread>
        <ThreadHeader>
          {title}, posted by {creatorId}
        </ThreadHeader>
        <ThreadContent>{content}</ThreadContent>
      </StyledThread>
    </ThreadWrapper>
  )
}

export default connect(null)(Thread)

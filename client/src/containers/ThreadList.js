import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchData } from '../actions/threadActions'
import styled from 'styled-components'
import { Container } from '../components/Login'
import './ThreadList.css'

export const ListWrapper = styled.main`
  background-color: #f4afc2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 75%;
  margin: 0 auto;
`

export class ThreadList extends Component {
  componentDidMount () {
    this.props.fetchData()
  }

  fetchThreadAuthor = userId => {
    return this.props.users.find(user => user.id === userId).username
  }

  render() {
    const { data: threads, users } = this.props
    if (threads.length && users.length) {
      const threadLinks = threads.map(thread => {
        return (
          <Link className="link" key={thread.id} to={`/thread/${thread.id}`}>
            {thread.title} -{' '}
            <strong>{this.fetchThreadAuthor(thread.userId)}</strong>
          </Link>
        )
      })
      return (
        <Container>
          <ListWrapper>{threadLinks}</ListWrapper>
        </Container>
      )
    } else {
      return <h1 id='loading-header'>Loading threads...</h1>
    }
  }
}

const mapStateToProps = state => ({
  users: state.threadData.users
})

export default connect(
  mapStateToProps,
  { fetchData }
)(ThreadList)

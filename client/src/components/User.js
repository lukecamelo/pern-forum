import React from 'react'
import styled from 'styled-components'
import { fetchData, fetchThreads } from '../actions/testActions'
import { connect } from 'react-redux'

const StyledUser = styled.div`
  color: palevioletred;
`

class User extends React.Component {
  componentDidMount = () => {
    this.props.fetchData()
    this.props.fetchThreads()
  }

  render() {
    if (this.props.data.length && this.props.threads.length) {
      let threads = this.props.threads.map(thread => {
        return <StyledUser key={thread.id}>{thread.text}</StyledUser>
      })

      return (
        <div>
          <StyledUser>{this.props.data[0].username}</StyledUser>
          <StyledUser>{threads}</StyledUser>
        </div>
      )
    } else {
      return <h1>loading</h1>
    }
  }
}

const mapStateToProps = state => ({
  data: state.test.data,
  threads: state.test.threads
})

export default connect(
  mapStateToProps,
  { fetchData, fetchThreads }
)(User)

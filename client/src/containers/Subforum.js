import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSubforumThreads } from '../actions/threadActions'
import ThreadList from './ThreadList'
import Pagination from '../components/Pagination'

class Subforum extends Component {
  componentDidMount = () => {
    this.props.fetchSubforumThreads(2)
  }
  
  render() {
    return (
      <React.Fragment>
        <h1>
          put what has so far been living in App.js here instead, corresponding
          to the subforum selected
        </h1>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  threads: state.threadData.threads
})

export default connect(
  mapStateToProps,
  { fetchSubforumThreads }
)(Subforum)

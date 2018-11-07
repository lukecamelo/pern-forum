import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSubforumThreads, fetchData } from '../actions/threadActions'
import ThreadList from './ThreadList'
import Pagination from '../components/Pagination'
import { Banner } from './App'
import { H1 } from '../styled'
import NavBar from '../components/NavBar'
import Loader from '../components/Loader'

class Subforum extends Component {
  state = {
    hasLoaded: false
  }

  async componentDidMount() {
    await this.props.fetchData()
    await this.props.fetchSubforumThreads(this.props.match.params.id)
    this.setState({
      hasLoaded: true
    })
  }

  render() {
    console.log(this.props.threads)
    if (this.state.hasLoaded) {
      return (
        <React.Fragment>
          <NavBar />
          <Banner>
            <H1 style={{ margin: '0 auto', color: 'white' }}>
              {this.props.match.params.id === '1' && 'General Discussion'}
              {this.props.match.params.id === '2' && 'Video Games'}
            </H1>
          </Banner>
          <Pagination
            data={this.props.threads}
            currentPage={this.props.match.params.page}
            context="threads"
            pageSize={15}
            isLoggedIn={this.props.auth.isLoggedIn}
          >
            {data => <ThreadList data={data} />}
          </Pagination>
        </React.Fragment>
      )
    } else {
      return <Loader />
    }
  }
}

const mapStateToProps = state => ({
  threads: state.threadData.threads,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { fetchSubforumThreads, fetchData }
)(Subforum)

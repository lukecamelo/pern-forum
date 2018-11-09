import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSubforumThreads, fetchData } from '../actions/threadActions'
import ThreadList from './ThreadList'
import Pagination from '../components/Pagination'
import { Banner } from './App'
import { H1, SubforumLink } from '../styled'
import NavBar from '../components/NavBar'
import Loader from '../components/Loader'

class Subforum extends Component {
  state = {
    hasLoaded: false,
    subforumName: ''
  }

  async componentDidMount() {
    await this.props.fetchData()
    switch (this.props.match.params.id) {
      case '1':
        this.setState({ subforumName: 'General Discussion' })
        break
      case '2':
        this.setState({ subforumName: 'Video Games' })
        break
      default:
        break
    }
    this.setState({
      hasLoaded: true
    })
  }

  render() {
    if (this.state.hasLoaded) {
      return (
        <React.Fragment>
          <NavBar />
          <Banner>
            <div>
              <SubforumLink
                to="/subforums"
                style={{ margin: '0 auto', color: 'white' }}
              >
                Forums
              </SubforumLink>{' '}
              <H1 style={{ margin: '0 auto', color: 'white', display: 'inline' }}> -> </H1>{' '}
              <H1 style={{ margin: '0 auto', color: 'white', display: 'inline' }}>
                {this.state.subforumName}
              </H1>
            </div>
          </Banner>
          <Pagination
            data={this.props.threads}
            currentPage={this.props.match.params.page}
            context="threads"
            pageSize={15}
            isLoggedIn={this.props.auth.isLoggedIn}
            subforumId={this.props.match.params.id}
          >
            {data => (
              <ThreadList data={data} subforumId={this.props.match.params.id} />
            )}
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

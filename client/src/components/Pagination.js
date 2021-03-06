import React, { Component } from 'react'
import * as Scroll from 'react-scroll'
import { Link } from 'react-router-dom'
import { NewThreadLink } from '../containers/App'
import '../css/Pagination.css'

class Pagination extends Component {
  state = {
    currentPage: null,
    pageCount: null
  }

  // Initializes page count based off of passed in data array
  componentDidMount = () => {
    const startingPage = this.props.startingPage ? this.props.startingPage : 1
    const data = this.props.data
    const pageSize = this.props.pageSize
    let pageCount = parseInt(data.length / pageSize, 10)
    if (data.length % pageSize > 0) {
      pageCount++
    }
    this.setState({
      currentPage: startingPage,
      pageCount: pageCount
    })
  }

  // Changes page and scrolls user to top of new page
  setCurrentPage = num => {
    let scroll = Scroll.animateScroll
    if (this.props.context === 'threads') {
      scroll.scrollToTop({ duration: 300, smooth: 'easeInOutQuint' })
    } else {
      scroll.scrollToTop({ duration: 500, smooth: 'easeInOutQuint' })
    }
    this.setState({ currentPage: num })
  }

  // Creates pagination controls based on page count
  createControls = () => {
    let controls = []
    const pageCount = this.state.pageCount
    for (let i = 1; i <= pageCount; i++) {
      const baseClassName = 'pagination-controls__button'
      const activeClassName =
        i === parseInt(this.props.currentPage, 10)
          ? `${baseClassName}--active`
          : ''
      controls.push(
        <Link
          to={
            this.props.context === 'threads'
              ? `/subforum/${this.props.subforumId}/page/${i}`
              : `/thread/${this.props.threadId}/page/${i}`
          }
          className={`${baseClassName} ${activeClassName}`}
          key={i}
          onClick={() => this.setCurrentPage(i)}
        >
          {i}
        </Link>
      )
    }
    return controls
  }

  // Creates slices of data to display on each page
  createPaginatedData = () => {
    const { data, pageSize } = this.props
    const currentPage = this.props.currentPage
    const upperLimit = currentPage * pageSize
    const dataSlice = data.slice(upperLimit - pageSize, upperLimit)
    return dataSlice
  }

  render() {
    const { context } = this.props
    return (
      <div className="pagination">
        {/* Paginated Content */}
        <div className="pagination-results">
          {this.props.children(this.createPaginatedData())}
        </div>

        {/* Different styles for ThreadList and Thread */}
        <div className={context === 'threads' ? 'bottom' : 'posts-bottom'}>
          {this.state.pageCount > 1 && (
            <div
              className="pagination-controls"
              style={context === 'threads' ? { marginBottom: '3em' } : null}
            >
              <span>{this.createControls()}</span>
            </div>
          )}

          {/* Showing post button only if logged in */}
          {context === 'threads' && this.props.isLoggedIn ? (
            <NewThreadLink
              style={{ padding: '.5em 1em', height: '35px' }}
              to={`/subforum/${this.props.subforumId}/newthread`}
            >
              Post Thread
            </NewThreadLink>
          ) : null}
        </div>
      </div>
    )
  }
}

Pagination.defaultProps = {
  pageSize: 20,
  startingPage: 1
}

export default Pagination

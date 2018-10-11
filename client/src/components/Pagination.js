import React, { Component } from 'react'
import * as Scroll from 'react-scroll'
import { Link } from 'react-router-dom'
import './Pagination.css'

class Pagination extends Component {
  state = {
    currentPage: null,
    pageCount: null
  }

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

  setCurrentPage = num => {
    let scroll = Scroll.animateScroll
    if(this.props.context === 'threads') {
      scroll.scrollToTop({ duration: 300, smooth: 'easeInOutQuint' })
    } else {
      scroll.scrollToTop({ duration: 500, smooth: 'easeInOutQuint' })
    }
    this.setState({ currentPage: num })
  }

  createControls = () => {
    let controls = []
    const pageCount = this.state.pageCount
    for (let i = 1; i <= pageCount; i++) {
      const baseClassName = 'pagination-controls__button'
      const activeClassName =
        i === parseInt(this.props.currentPage, 10) ? `${baseClassName}--active` : ''
      controls.push(
        <Link
          to={
            this.props.context === 'threads'
              ? `/threads/${i}`
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

  createPaginatedData = () => {
    const { data, pageSize } = this.props
    const currentPage = this.props.currentPage
    const upperLimit = currentPage * pageSize
    const dataSlice = data.slice(upperLimit - pageSize, upperLimit)
    return dataSlice
  }

  render() {
    return (
      <div className="pagination">
        <div className="pagination-results">
          {this.props.children(this.createPaginatedData())}
        </div>
        <div className="pagination-controls">{this.createControls()}</div>
      </div>
    )
  }
}

Pagination.defaultProps = {
  pageSize: 20,
  startingPage: 1
}

export default Pagination

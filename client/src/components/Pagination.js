import React, { Component } from 'react'
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
    console.log(data)
    let pageCount = parseInt(data.length / pageSize, 10)
    if (data.length % pageSize > 0) {
      pageCount++
    }
    this.setState({
      currentPage: startingPage,
      pageCount: pageCount
    })
  }

  setCurrentPage = num => this.setState({ currentPage: num })

  createControls = () => {
    let controls = []
    const pageCount = this.state.pageCount
    for (let i = 1; i <= pageCount; i++) {
      const baseClassName = 'pagination-controls__button'
      const activeClassName =
        i === this.state.currentPage ? `${baseClassName}--active` : ''
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
  pageSize: 10,
  startingPage: 1
}

export default Pagination

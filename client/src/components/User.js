import React from 'react'
import styled from 'styled-components'
import { fetchData } from '../actions/testActions'
import { connect } from 'react-redux'

const StyledUser = styled.div`
  color: palevioletred;
`

class User extends React.Component {

  componentDidMount = () => {
    this.props.fetchData()
  }
  
  render() {
    if(this.props.data.length) {
      return <StyledUser>{this.props.data[0].username}</StyledUser>
    } else {
      return <h1>loading</h1>
    }
  }
}

const mapStateToProps = state => ({
  data: state.test.data
})

export default connect(
  mapStateToProps,
  { fetchData }
)(User)

import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { Banner } from './App'
import { H1 } from '../styled'
import NavBar from '../components/NavBar'

const SubforumContainer = styled.div`
  width: 75vw;
  // padding: 0 1em 1em 1em;
  margin: 0 auto 2em auto;
  background-color: white;
`

class SubforumList extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Banner>
          <H1 style={{ margin: '0 auto', color: 'white' }}>Forums</H1>
        </Banner>
        <SubforumContainer>
          <Link className="title" to="/">
            General Discussion
          </Link>
        </SubforumContainer>
      </React.Fragment>
    )
  }
}

export default SubforumList

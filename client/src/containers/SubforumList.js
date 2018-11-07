import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { Banner } from './App'
import { H1, Container } from '../styled'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

const SubforumContainer = styled.div`
  width: 75vw;
  // padding: 0 1em 1em 1em;
  margin: 0 auto 2em auto;
  background-color: white;
  box-shadow: ${props => props.theme.mediumShadow};
`

class SubforumList extends Component {
  render() {
    return (
      <React.Fragment>
        <Container>
          <NavBar />
          <Banner>
            <H1 style={{ margin: '0 auto', color: 'white' }}>Forums</H1>
          </Banner>
          <SubforumContainer>
            <Link className="title" to="/subforum/1/page/1">
              General Discussion
            </Link>
            <Link className="title" to="/subforum/2/page/1">
              Video Games
            </Link>
          </SubforumContainer>
        </Container>
        <Footer />
      </React.Fragment>
    )
  }
}

export default SubforumList
